
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Get the license key from the request
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
          status: 400 
        }
      )
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get the license from the database
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('key', licenseKey)
      .single()

    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid license key' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      )
    }

    // Check if the license is for the right application
    if (applicationName && license.application !== applicationName) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'License key is not valid for this application' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403 
        }
      )
    }

    // Check if the license is expired
    if (license.expires_at && new Date(license.expires_at) < new Date()) {
      // Update license status to expired if it's not already
      if (license.status !== 'Expired') {
        await supabase
          .from('licenses')
          .update({ status: 'Expired' })
          .eq('id', license.id)
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'License key has expired' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403 
        }
      )
    }

    // Check if the license is suspended
    if (license.status === 'Suspended') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'License key is suspended' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403 
        }
      )
    }

    // Hardware ID check - if HWID is provided and stored in metadata, check it
    if (hwid && license.metadata?.hwid && license.metadata.hwid !== hwid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Hardware ID mismatch' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403 
        }
      )
    }

    // If HWID is provided but not stored, store it
    if (hwid && (!license.metadata?.hwid)) {
      const metadata = { ...license.metadata, hwid }
      
      await supabase
        .from('licenses')
        .update({ metadata })
        .eq('id', license.id)
    }

    // Log the verification
    await supabase
      .from('api_logs')
      .insert({
        license_id: license.id,
        action: 'verify',
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        user_agent: req.headers.get('user-agent'),
        metadata: {
          hwid: hwid || null
        }
      })

    // Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'License key is valid',
        data: {
          licenseId: license.id,
          application: license.application,
          status: license.status,
          expiresAt: license.expires_at
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in verify-license function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
