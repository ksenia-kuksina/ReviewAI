import { NextRequest, NextResponse } from 'next/server'
import { parseRawReviews, analyzeReviewsWithAI } from '@/lib/review-analyzer-ai'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['text/csv', 'application/json', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only CSV, JSON, and TXT files are supported.' },
        { status: 400 }
      )
    }

    let reviewText = ''

    try {
      // Read file content based on type
      if (file.type === 'application/json') {
        const jsonText = await file.text()
        const jsonData = JSON.parse(jsonText)
        
        // Handle different JSON structures
        if (Array.isArray(jsonData)) {
          // Array of review objects
          reviewText = jsonData.map((review: any) => 
            review.text || review.comment || review.review || JSON.stringify(review)
          ).join('\n\n')
        } else if (jsonData.reviews && Array.isArray(jsonData.reviews)) {
          // Object with reviews array
          reviewText = jsonData.reviews.map((review: any) => 
            review.text || review.comment || review.review || JSON.stringify(review)
          ).join('\n\n')
        } else {
          // Single review or other structure
          reviewText = jsonData.text || jsonData.comment || jsonData.review || JSON.stringify(jsonData)
        }
      } else {
        // CSV or TXT - read as plain text
        reviewText = await file.text()
      }
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Failed to parse file content. Please check the file format.' },
        { status: 400 }
      )
    }

    if (!reviewText.trim()) {
      return NextResponse.json(
        { error: 'No review content found in the file.' },
        { status: 400 }
      )
    }

    // Parse and analyze reviews
    const reviews = parseRawReviews(reviewText)
    
    if (reviews.length === 0) {
      return NextResponse.json(
        { error: 'No valid reviews found in the file. Please ensure the file contains review text.' },
        { status: 400 }
      )
    }

    const analysis = await analyzeReviewsWithAI(reviews)
    
    // Generate result
    const result = {
      id: generateSlug(`file-${file.name}`),
      product: {
        title: `Reviews from ${file.name}`,
        image: null,
        sourceUrl: null
      },
      stats: {
        reviewsTotal: reviews.length,
        dateFrom: null,
        dateTo: null,
        sources: ['uploaded-file']
      },
      summary: analysis,
      rawSampleKept: reviews.length,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('File analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze file. Please try again.' },
      { status: 500 }
    )
  }
} 