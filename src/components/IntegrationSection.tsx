
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from './CodeBlock';

const IntegrationSection = () => {
  const codeExamples = {
    csharp: 
`using KeyAuth;

// Initialize the API
var api = new KeyAuthApp(
    name: "app_name",
    ownerid: "owner_id",
    secret: "app_secret",
    version: "1.0"
);

// Login with license key
bool success = api.license("LICENSE_KEY");
if (success)
{
    Console.WriteLine("Authenticated successfully!");
    Console.WriteLine($"Welcome back {api.user_data.username}");
}`,

    cpp:
`#include "KeyAuth.hpp"
std::string name = "app_name";
std::string ownerid = "owner_id";
std::string secret = "app_secret";
std::string version = "1.0";

// Initialize API
KeyAuth::api KeyAuthApp(name, ownerid, secret, version);

int main()
{
    // Initialize connection
    KeyAuthApp.init();
    
    // Login with license
    std::string license;
    std::cout << "Enter license: ";
    std::cin >> license;
    
    KeyAuthApp.license(license);
    if (KeyAuthApp.data.success)
    {
        std::cout << "Successfully authenticated!" << std::endl;
    }
    
    return 0;
}`,

    python:
`import keyauth

# Initialize the KeyAuth client
client = keyauth.Client(
    name="app_name",
    owner_id="owner_id",
    secret="app_secret",
    version="1.0"
)

# Initialize the connection
client.init()

# Login with license key
license_key = input("Enter your license key: ")
result = client.license(license_key)

if result:
    print(f"Successfully authenticated as {client.user_data.username}")
    print(f"Subscription expires: {client.user_data.expires}")
else:
    print("Failed to authenticate with license key")`,

    javascript:
`const KeyAuth = require('keyauth-js');

// Initialize KeyAuth client
const client = new KeyAuth.Client({
  name: 'app_name',
  ownerId: 'owner_id',
  secret: 'app_secret',
  version: '1.0'
});

// Initialize connection
client.initialize().then(() => {
  // Authenticate with license key
  const licenseKey = 'LICENSE_KEY';
  return client.license(licenseKey);
}).then(result => {
  if (result.success) {
    console.log('Successfully authenticated!');
    console.log('Username:', result.userData.username);
    console.log('Expiry:', result.userData.expires);
  } else {
    console.error('Authentication failed:', result.message);
  }
}).catch(error => {
  console.error('Error:', error.message);
});`
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Integration</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Integrate KeyAuth with your applications using our libraries for multiple programming languages.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="csharp" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="csharp">C#</TabsTrigger>
              <TabsTrigger value="cpp">C++</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="csharp">
                <CodeBlock code={codeExamples.csharp} language="csharp" title="C# Example" />
              </TabsContent>
              <TabsContent value="cpp">
                <CodeBlock code={codeExamples.cpp} language="cpp" title="C++ Example" />
              </TabsContent>
              <TabsContent value="python">
                <CodeBlock code={codeExamples.python} language="python" title="Python Example" />
              </TabsContent>
              <TabsContent value="javascript">
                <CodeBlock code={codeExamples.javascript} language="javascript" title="JavaScript Example" />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
