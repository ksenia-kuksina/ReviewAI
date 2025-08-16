import { NextRequest, NextResponse } from 'next/server'
import { parseRawReviews, analyzeReviewsWithAI } from '@/lib/review-analyzer-simple'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { rawText } = await request.json()

    if (!rawText || rawText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Please provide at least 50 characters of review text' },
        { status: 400 }
      )
    }

    // Parse raw text into structured reviews
    const reviews = parseRawReviews(rawText)
    
    if (reviews.length === 0) {
      return NextResponse.json(
        { error: 'Could not parse any reviews from the provided text' },
        { status: 400 }
      )
    }

    // Analyze reviews with AI
    const analysis = await analyzeReviewsWithAI(reviews)

    const result = {
      id: generateSlug(rawText.substring(0, 50)),
      product: {
        title: 'Reviews Analysis',
        image: null,
        sourceUrl: null
      },
      stats: {
        reviewsTotal: reviews.length,
        dateFrom: reviews[0]?.date || null,
        dateTo: reviews[reviews.length - 1]?.date || null,
        sources: ['pasted-text']
      },
      summary: analysis,
      rawSampleKept: Math.min(reviews.length, 10),
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error analyzing text:', error)
    return NextResponse.json(
      { error: 'Failed to analyze reviews text' },
      { status: 500 }
    )
  }
} 