import { NextRequest, NextResponse } from 'next/server'
import { extractDomain } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    const domain = extractDomain(url)
    
    // Check if this marketplace is supported
    const supportedMarketplaces = ['amazon.com', 'ebay.com', 'aliexpress.com']
    const isSupported = supportedMarketplaces.some(marketplace => 
      domain.includes(marketplace)
    )

    if (!isSupported) {
      return NextResponse.json(
        { 
          error: `This marketplace (${domain}) is not yet supported.`,
          suggestion: 'Please paste your reviews manually or upload a file instead.',
          supportedMarketplaces: supportedMarketplaces
        },
        { status: 400 }
      )
    }

    // For now, return a "coming soon" message
    return NextResponse.json(
      { 
        error: 'API integration is coming soon!',
        message: `We're working on official API integration for ${domain}.`,
        suggestion: 'For now, please paste your reviews manually or upload a file.',
        estimatedLaunch: 'Q1 2025'
      },
      { status: 503 }
    )

  } catch (error) {
    console.error('API analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
} 