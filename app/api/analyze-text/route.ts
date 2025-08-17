import { NextRequest, NextResponse } from 'next/server'
import { parseRawReviews, analyzeReviewsWithAI } from '@/lib/review-analyzer-ai'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { rawText } = await request.json()

    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json(
        { error: 'Review text is required' },
        { status: 400 }
      )
    }

    if (rawText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Please provide at least 50 characters of review text' },
        { status: 400 }
      )
    }

    // Parse and analyze reviews
    const reviews = parseRawReviews(rawText)
    
    if (reviews.length === 0) {
      return NextResponse.json(
        { error: 'No valid reviews found in the text. Please ensure the text contains review content.' },
        { status: 400 }
      )
    }

    const analysis = await analyzeReviewsWithAI(reviews)
    
    // Generate result
    const result = {
      id: generateSlug('manual-reviews'),
      product: {
        title: 'Reviews Analysis',
        image: null,
        sourceUrl: null
      },
      stats: {
        reviewsTotal: reviews.length,
        dateFrom: null,
        dateTo: null,
        sources: ['pasted-text']
      },
      summary: analysis,
      rawSampleKept: reviews.length,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Text analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze reviews. Please try again.' },
      { status: 500 }
    )
  }
} 