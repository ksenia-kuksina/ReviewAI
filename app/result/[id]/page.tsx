'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, ThumbsUp, ThumbsDown, Target, Copy, Download, Share2, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalysisResult {
  id: string
  product: {
    title: string
    image: string | null
    sourceUrl: string | null
  }
  stats: {
    reviewsTotal: number
    dateFrom: string | null
    dateTo: string | null
    sources: string[]
  }
  summary: {
    pros: string[]
    cons: string[]
    themes: Array<{ name: string; desc: string }>
    verdict: string
    score: number
    suggestions: string[]
  }
  rawSampleKept: number
  timestamp: string
}

export default function ResultPage() {
  const params = useParams()
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // For demo purposes, generate mock result
    // In production, this would fetch from API
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        id: params.id as string,
        product: {
          title: "Wireless Earbuds X",
          image: null,
          sourceUrl: "https://example.com/product"
        },
        stats: {
          reviewsTotal: 184,
          dateFrom: "2024-01-01",
          dateTo: "2024-01-15",
          sources: ["amazon.com"]
        },
        summary: {
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
          score: 4.2,
          suggestions: [
            "Consider offering a more affordable version to address price concerns",
            "Improve the mobile app functionality based on user feedback",
            "Add wireless charging capability to the charging case"
          ]
        },
        rawSampleKept: 10,
        timestamp: new Date().toISOString()
      }
      setResult(mockResult)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleCopy = async () => {
    if (!result) return
    
    const summary = `
ReviewMind AI Analysis

Product: ${result.product.title}
Score: ${result.summary.score}/5.0

PROS:
${result.summary.pros.map(pro => `• ${pro}`).join('\n')}

CONS:
${result.summary.cons.map(con => `• ${con}`).join('\n')}

VERDICT:
${result.summary.verdict}

TOP THEMES:
${result.summary.themes.map(theme => `• ${theme.name}: ${theme.desc}`).join('\n')}

SUGGESTIONS:
${result.summary.suggestions.map(suggestion => `• ${suggestion}`).join('\n')}

Based on ${result.stats.reviewsTotal} reviews from ${result.stats.sources.join(', ')}
    `.trim()
    
    try {
      await navigator.clipboard.writeText(summary)
      // Show success toast
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleExport = () => {
    if (!result) return
    
    const dataStr = JSON.stringify(result, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `reviewmind_${result.id}_${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (!result) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ReviewMind AI Analysis: ${result.product.title}`,
          text: `Check out this AI-powered review analysis!`,
          url: window.location.href
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href)
      // Show success toast
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing reviews...</p>
        </div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load analysis'}</p>
          <a href="/" className="text-primary-600 hover:text-primary-700 underline">
            Back to home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <a href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to home
            </a>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCopy}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </button>
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            {result.product.image ? (
              <img
                src={result.product.image}
                alt={result.product.title}
                className="w-20 h-20 object-cover rounded-lg mr-6"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-lg mr-6 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">📱</span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{result.product.title}</h1>
              {result.product.sourceUrl && (
                <a
                  href={result.product.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  View original product →
                </a>
              )}
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-400 mr-2" />
                <span className="text-4xl font-bold text-gray-900">{result.summary.score}</span>
                <span className="text-xl text-gray-500 ml-1">/5</span>
              </div>
              <p className="text-gray-600">Based on {result.stats.reviewsTotal} reviews</p>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <ThumbsUp className="h-6 w-6 mr-2" />
                Pros
              </h2>
              <ul className="space-y-3">
                {result.summary.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                <ThumbsDown className="h-6 w-6 mr-2" />
                Cons
              </h2>
              <ul className="space-y-3">
                {result.summary.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict */}
          <div className="border-t pt-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verdict</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{result.summary.verdict}</p>
          </div>

          {/* Themes */}
          <div className="border-t pt-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Top Themes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {result.summary.themes.map((theme, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{theme.name}</h3>
                  <p className="text-gray-600 text-sm">{theme.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Suggestions for Improvement
            </h2>
            <div className="space-y-3">
              {result.summary.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Used */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Used</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Reviews Analyzed</h3>
              <p className="text-2xl font-bold text-gray-900">{result.stats.reviewsTotal}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Date Range</h3>
              <p className="text-sm text-gray-600">
                {result.stats.dateFrom && result.stats.dateTo
                  ? `${new Date(result.stats.dateFrom).toLocaleDateString()} - ${new Date(result.stats.dateTo).toLocaleDateString()}`
                  : 'Not specified'
                }
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Sources</h3>
              <p className="text-sm text-gray-600">{result.stats.sources.join(', ')}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Analysis completed on {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 