import { NextRequest, NextResponse } from 'next/server'
import { extractReviewsFromUrl, analyzeReviewsWithAI } from '@/lib/review-analyzer-ai'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Extract reviews from URL
    const reviews = await extractReviewsFromUrl(url)
    
    if (reviews.length === 0) {
      return NextResponse.json(
        { error: 'No reviews found. Please try pasting reviews instead.' },
        { status: 404 }
      )
    }

    // Analyze reviews with AI
    const analysis = await analyzeReviewsWithAI(reviews)

    // Get product info from URL
    const productInfo = await extractProductInfo(url)

    const result = {
      id: generateSlug(url),
      product: productInfo,
      stats: {
        reviewsTotal: reviews.length,
        dateFrom: reviews[0]?.date || null,
        dateTo: reviews[reviews.length - 1]?.date || null,
        sources: [extractDomain(url)]
      },
      summary: analysis,
      rawSampleKept: Math.min(reviews.length, 10),
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error analyzing URL:', error)
    return NextResponse.json(
      { error: 'Failed to analyze reviews. Please try pasting reviews instead.' },
      { status: 500 }
    )
  }
}

async function extractProductInfo(url: string) {
  try {
    // For MVP, return basic info
    return {
      title: 'Product from ' + extractDomain(url),
      image: null,
      sourceUrl: url
    }
  } catch (error) {
    console.error('Failed to extract product info:', error)
    return {
      title: 'Product from ' + extractDomain(url),
      image: null,
      sourceUrl: url
    }
  }
}

function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '')
  } catch {
    return 'unknown'
  }
} 