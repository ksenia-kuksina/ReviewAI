'use client'

import { useState } from 'react'
import { Search, FileText, Zap, TrendingUp, Star, ThumbsUp, ThumbsDown, Target, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [showTextMode, setShowTextMode] = useState(false)
  const [rawText, setRawText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUrlAnalyze = async () => {
    if (!url.trim()) return
    
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze URL')
      }
      
      const result = await response.json()
      router.push(`/result/${result.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze reviews')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleTextAnalyze = async () => {
    if (!rawText.trim()) return
    
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rawText: rawText.trim() }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze text')
      }
      
      const result = await response.json()
      router.push(`/result/${result.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze reviews')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const demoData = {
    pros: [
      "Excellent sound quality",
      "Long battery life (8+ hours)",
      "Comfortable fit",
      "Quick pairing",
      "Good noise cancellation",
      "Premium build quality"
    ],
    cons: [
      "Expensive price point",
      "Case is bulky",
      "Limited color options",
      "No wireless charging",
      "App could be better",
      "Slight delay in gaming mode"
    ],
    themes: [
      { name: "Battery", desc: "Long-lasting performance praised" },
      { name: "Sound Quality", desc: "Crystal clear audio experience" },
      { name: "Comfort", desc: "Great for extended wear" },
      { name: "Build Quality", desc: "Premium materials and durability" },
      { name: "Price", desc: "High cost concerns mentioned" }
    ],
    verdict: "High-quality wireless earbuds with excellent sound and battery life, but at a premium price that may not justify the cost for budget-conscious buyers.",
    score: 4.2
  }

  return (
    <div className="min-h-screen">
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
            Let AI read 1000+ reviews for you
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Paste a product link. Let AI read 1000+ reviews and give you the truth.
          </p>

          {/* Error Display */}
          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-1">
                Try using the "paste reviews" mode instead.
              </p>
            </div>
          )}

          {/* URL Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex shadow-lg rounded-lg overflow-hidden">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://amazon.com/product..."
                className="flex-1 px-6 py-4 text-lg border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleUrlAnalyze()}
              />
              <button
                onClick={handleUrlAnalyze}
                disabled={isAnalyzing || !url.trim()}
                className="bg-primary-600 text-white px-8 py-4 font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Reviews'
                )}
              </button>
            </div>
            
            <button
              onClick={() => setShowTextMode(!showTextMode)}
              className="text-primary-600 hover:text-primary-700 text-sm mt-3 underline"
            >
              Or paste reviews instead
            </button>
          </div>

          {/* Text Mode */}
          {showTextMode && (
            <div className="max-w-2xl mx-auto mb-8">
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your reviews here...\n\nReview 1: Great product, love it!\nReview 2: Not worth the money..."
                rows={6}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none resize-none"
              />
              <button
                onClick={handleTextAnalyze}
                disabled={isAnalyzing || !rawText.trim()}
                className="w-full mt-3 bg-primary-600 text-white px-8 py-4 font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Pasted Text'
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1) Paste link</h3>
              <p className="text-gray-600">Simply paste the product URL from Amazon, AliExpress, eBay, or any other marketplace.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2) We read reviews</h3>
              <p className="text-gray-600">Our AI analyzes hundreds or thousands of reviews to extract the key insights.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3) You get the answer</h3>
              <p className="text-gray-600">Receive a concise summary with pros, cons, verdict, score, and key themes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            See it in action
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
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
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Pros
                </h4>
                <ul className="space-y-2">
                  {demoData.pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                  <ThumbsDown className="h-5 w-5 mr-2" />
                  Cons
                </h4>
                <ul className="space-y-2">
                  {demoData.cons.map((con, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Verdict</h4>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">{demoData.score}</span>
                </div>
              </div>
              <p className="text-gray-700">{demoData.verdict}</p>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Top Themes
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {demoData.themes.map((theme, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-1">{theme.name}</h5>
                    <p className="text-sm text-gray-600">{theme.desc}</p>
                  </div>
                ))}
              </div>
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
              <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
            </div>
            <p className="text-gray-400 text-sm">Powered by AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 