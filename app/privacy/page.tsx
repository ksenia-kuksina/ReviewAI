export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="prose prose-gray max-w-none">
            <h2>Data Collection</h2>
            <p>
              ReviewMind AI collects minimal personal data to provide our review analysis service. 
              We do not store your personal information beyond what is necessary for the service.
            </p>
            
            <h2>Review Data</h2>
            <p>
              When you submit a product URL or paste review text, we temporarily process this data 
              to generate analysis. We do not permanently store the raw review content or personal 
              information from reviews.
            </p>
            
            <h2>Analytics</h2>
            <p>
              We collect anonymous usage statistics to improve our service, including:
            </p>
            <ul>
              <li>Number of analyses performed</li>
              <li>Domains analyzed</li>
              <li>Service performance metrics</li>
            </ul>
            
            <h2>Data Retention</h2>
            <p>
              Raw review data is processed in memory and not stored permanently. 
              Analysis results may be cached temporarily for performance.
            </p>
            
            <h2>Third-Party Services</h2>
            <p>
              We may use third-party AI services for analysis. These services are bound by 
              their own privacy policies and data handling practices.
            </p>
            
            <h2>Contact</h2>
            <p>
              For privacy-related questions, please contact us at privacy@reviewmind.ai
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