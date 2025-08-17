'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Link, AlertCircle, CheckCircle, Zap } from 'lucide-react'

export default function HomePage() {
  const [inputType, setInputType] = useState<'text' | 'file' | 'api'>('text')
  const [textInput, setTextInput] = useState('')
  const [fileInput, setFileInput] = useState<File | null>(null)
  const [apiUrl, setApiUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      setError('Please enter some review text')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: textInput })
      })
      
      if (!response.ok) throw new Error('Analysis failed')
      
      const result = await response.json()
      router.push(`/result/${result.id}`)
    } catch (err) {
      setError('Failed to analyze reviews. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSubmit = async () => {
    if (!fileInput) {
      setError('Please select a file')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const formData = new FormData()
      formData.append('file', fileInput)
      
      const response = await fetch('/api/analyze-file', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('File analysis failed')
      
      const result = await response.json()
      router.push(`/result/${result.id}`)
    } catch (err) {
      setError('Failed to analyze file. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiSubmit = async () => {
    if (!apiUrl.trim()) {
      setError('Please enter a supported marketplace URL')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/analyze-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: apiUrl })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'API analysis failed')
      }
      
      const result = await response.json()
      router.push(`/result/${result.id}`)
    } catch (err: any) {
      setError(err.message || 'Failed to analyze via API. Please try manual input.')
    } finally {
      setIsLoading(false)
    }
  }

  const supportedMarketplaces = [
    { name: 'Amazon', status: 'Coming Soon', icon: '🛒' },
    { name: 'eBay', status: 'Coming Soon', icon: '🏷️' },
    { name: 'AliExpress', status: 'Coming Soon', icon: '📦' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-primary-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">ReviewMind AI</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="/privacy" className="text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="/terms" className="text-gray-500 hover:text-gray-700">Terms</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Review Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Get instant insights from product reviews. Upload reviews manually or use supported marketplace APIs.
          </p>
          
          {/* Input Type Selector */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setInputType('text')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                inputType === 'text'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText className="inline w-5 h-5 mr-2" />
              Paste Reviews
            </button>
            <button
              onClick={() => setInputType('file')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                inputType === 'file'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Upload className="inline w-5 h-5 mr-2" />
              Upload File
            </button>
            <button
              onClick={() => setInputType('api')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                inputType === 'api'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Link className="inline w-5 h-5 mr-2" />
              API Integration
            </button>
          </div>

          {/* Input Forms */}
          <div className="max-w-2xl mx-auto">
            {inputType === 'text' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Paste Your Reviews</h3>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste your product reviews here... (minimum 50 characters)"
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={isLoading || !textInput.trim()}
                  className="w-full mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Reviews'}
                </button>
              </div>
            )}

            {inputType === 'file' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Upload Review File</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <input
                    type="file"
                    accept=".csv,.json,.txt"
                    onChange={(e) => setFileInput(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-primary-600 hover:text-primary-500 font-medium">
                      Choose a file
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    CSV, JSON, or TXT files up to 10MB
                  </p>
                </div>
                {fileInput && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Selected: <span className="font-medium">{fileInput.name}</span>
                    </p>
                  </div>
                )}
                <button
                  onClick={handleFileSubmit}
                  disabled={isLoading || !fileInput}
                  className="w-full mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze File'}
                </button>
              </div>
            )}

            {inputType === 'api' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">API Integration</h3>
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Currently in development</p>
                      <p>We're working on official API integrations for major marketplaces.</p>
                    </div>
                  </div>
                </div>
                <input
                  type="url"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://amazon.com/product..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleApiSubmit}
                  disabled={isLoading || !apiUrl.trim()}
                  className="w-full mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Checking...' : 'Check Availability'}
                </button>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1) Submit Reviews</h3>
              <p className="text-gray-600">
                Paste review text directly, upload a file, or use supported marketplace APIs when available.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2) AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes the reviews to extract key insights, sentiment, and patterns.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3) Get Insights</h3>
              <p className="text-gray-600">
                Receive a comprehensive summary with pros, cons, verdict, and actionable suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Marketplaces */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Supported Marketplaces</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {supportedMarketplaces.map((marketplace) => (
              <div key={marketplace.name} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">{marketplace.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{marketplace.name}</h3>
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  {marketplace.status}
                </span>
                <p className="text-gray-600 mt-3">
                  Official API integration coming soon. For now, please paste reviews manually.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Results */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">See It In Action</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
              <div>
                <h3 className="text-xl font-semibold">Wireless Earbuds X</h3>
                <p className="text-gray-600">Premium wireless earbuds with noise cancellation</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Pros
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Excellent sound quality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Long battery life (8+ hours)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Comfortable fit</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Cons
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Expensive price point</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Case is bulky</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Limited color options</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Verdict</h4>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">4.2</span>
                </div>
              </div>
              <p className="text-gray-700">
                High-quality wireless earbuds with excellent sound and battery life, but at a premium price that may not justify the cost for budget-conscious buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary-400 mr-2" />
              <span className="text-lg font-semibold">ReviewMind AI</span>
            </div>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="/privacy" className="text-gray-300 hover:text-white">Privacy</a>
              <a href="/terms" className="text-gray-300 hover:text-white">Terms</a>
            </div>
            <p className="text-gray-400 text-sm">Powered by AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}