export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="prose prose-gray max-w-none">
            <h2>Service Description</h2>
            <p>
              ReviewMind AI provides AI-powered analysis of product reviews. Our service analyzes 
              review text to extract insights, pros, cons, and themes.
            </p>
            
            <h2>Acceptable Use</h2>
            <p>
              You agree to use our service only for lawful purposes and in accordance with these terms. 
              You must not:
            </p>
            <ul>
              <li>Submit malicious or harmful content</li>
              <li>Attempt to overload or disrupt our systems</li>
              <li>Use our service for commercial purposes without permission</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
            
            <h2>Content Guidelines</h2>
            <p>
              When submitting review text or URLs, ensure you have the right to use such content. 
              Do not submit copyrighted material without permission.
            </p>
            
            <h2>Service Availability</h2>
            <p>
              We strive to provide reliable service but cannot guarantee 100% uptime. 
              We may temporarily suspend service for maintenance or updates.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              ReviewMind AI is provided "as is" without warranties. We are not liable for any 
              damages arising from use of our service or analysis results.
            </p>
            
            <h2>Intellectual Property</h2>
            <p>
              Our service, including analysis algorithms and interface, is protected by intellectual 
              property rights. Analysis results are provided for your use but remain our property.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of our service 
              constitutes acceptance of updated terms.
            </p>
            
            <h2>Contact</h2>
            <p>
              For questions about these terms, please contact us at legal@reviewmind.ai
            </p>
            
            <p className="text-sm text-gray-500 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 