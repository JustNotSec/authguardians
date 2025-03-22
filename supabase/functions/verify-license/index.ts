
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { licenseKey, applicationName, hwid } = await req.json()

    if (!licenseKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'License key is required' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get the license
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('key', licenseKey)
      .single()

    if (error || !license) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid license key' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      )
    }

    // Check if the application matches if specified
    if (applicationName && license.application !== applicationName) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'License key is not valid for this application' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    // Check license status
    if (license.status !== 'Active') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `License is ${license.status.toLowerCase()}` 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    // Check expiration
    if (license.expires_at && new Date(license.expires_at) < new Date()) {
      // Update license status to expired
      await supabase
        .from('licenses')
        .update({ status: 'Expired' })
        .eq('id', license.id)
        
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'License has expired' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    // Log the API call
    await supabase
      .from('api_logs')
      .insert({
        license_id: license.id,
        action: 'verify',
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        user_agent: req.headers.get('user-agent'),
        metadata: {
          hwid: hwid || null,
          application: applicationName || null
        }
      })

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'License verified successfully',
        data: {
          licenseId: license.id,
          application: license.application,
          status: license.status,
          expiresAt: license.expires_at
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: `Server error: ${err.message}` 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
