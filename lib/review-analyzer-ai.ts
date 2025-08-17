import OpenAI from 'openai'
import { openai } from './config'

export interface Review {
  author: string | null
  rating: number
  date: string | null
  text: string
  helpful: number
}

export interface AnalysisResult {
  pros: string[]
  cons: string[]
  themes: Array<{ name: string; desc: string }>
  verdict: string
  score: number
  suggestions: string[]
}

// Real AI analysis using OpenAI
export async function analyzeReviewsWithAI(reviews: Review[]): Promise<AnalysisResult> {
  try {
    if (!openai.apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const client = new OpenAI({
      apiKey: openai.apiKey,
    })

    // Prepare reviews for analysis
    const reviewsText = reviews.map((r, i) => 
      `Review ${i + 1} (Rating: ${r.rating}/5): ${r.text}`
    ).join('\n\n')

    const prompt = `Analyze these product reviews and provide a comprehensive summary.

Reviews:
${reviewsText}

Please analyze the reviews and provide:
1. 3-6 main PROS (positive aspects)
2. 3-6 main CONS (negative aspects) 
3. 3-5 recurring themes with descriptions
4. A concise verdict (1-2 sentences)
5. Overall score (1.0-5.0)
6. 2-3 actionable suggestions for improvement

Format your response as JSON:
{
  "pros": ["pro1", "pro2", "pro3"],
  "cons": ["con1", "con2", "con3"],
  "themes": [{"name": "theme1", "desc": "description"}, {"name": "theme2", "desc": "description"}],
  "verdict": "Your verdict here",
  "score": 4.2,
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}

Focus on the most important and recurring points. Be honest and balanced. Provide actionable suggestions based on the negative feedback.`

    const completion = await client.chat.completions.create({
      model: openai.model,
      messages: [
        {
          role: 'system',
          content: 'You are a product review analyst. Analyze reviews objectively and provide balanced insights with actionable suggestions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1200
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(response)
      return {
        pros: parsed.pros || [],
        cons: parsed.cons || [],
        themes: parsed.themes || [],
        verdict: parsed.verdict || 'Analysis completed',
        score: parsed.score || 3.0,
        suggestions: parsed.suggestions || []
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      // Fallback to rule-based analysis
      return fallbackAnalysis(reviews)
    }

  } catch (error) {
    console.error('OpenAI API error:', error)
    // Fallback to rule-based analysis
    return fallbackAnalysis(reviews)
  }
}

// Fallback rule-based analysis
function fallbackAnalysis(reviews: Review[]): AnalysisResult {
  const totalReviews = reviews.length
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  
  const positiveKeywords = [
    'great', 'good', 'excellent', 'love', 'amazing', 'perfect', 'best', 'awesome', 'fantastic', 'wonderful',
    'outstanding', 'superb', 'brilliant', 'exceptional', 'incredible', 'phenomenal', 'stellar', 'top-notch'
  ]
  
  const negativeKeywords = [
    'bad', 'terrible', 'awful', 'hate', 'worst', 'disappointing', 'poor', 'cheap', 'broken', 'useless',
    'horrible', 'dreadful', 'atrocious', 'abysmal', 'mediocre', 'subpar', 'inferior', 'defective'
  ]
  
  const pros: string[] = []
  const cons: string[] = []
  
  reviews.forEach(review => {
    const text = review.text.toLowerCase()
    
    positiveKeywords.forEach(keyword => {
      if (text.includes(keyword) && pros.length < 6) {
        const keywordDisplay = keyword.charAt(0).toUpperCase() + keyword.slice(1)
        pros.push(`${keywordDisplay} mentioned`)
      }
    })
    
    negativeKeywords.forEach(keyword => {
      if (text.includes(keyword) && cons.length < 6) {
        const keywordDisplay = keyword.charAt(0).toUpperCase() + keyword.slice(1)
        cons.push(`${keywordDisplay} issues reported`)
      }
    })
  })
  
  const themes = [
    { name: 'Quality', desc: 'Product quality and build' },
    { name: 'Value', desc: 'Price and value for money' },
    { name: 'Performance', desc: 'How well the product works' }
  ]
  
  let verdict = ''
  if (avgRating >= 4.5) {
    verdict = 'Highly recommended product with overwhelmingly positive feedback.'
  } else if (avgRating >= 4.0) {
    verdict = 'Good product with mostly positive reviews.'
  } else if (avgRating >= 3.0) {
    verdict = 'Mixed reviews with both positive and negative feedback.'
  } else {
    verdict = 'Product has significant issues based on user feedback.'
  }

  const suggestions = [
    'Consider addressing the most common negative feedback points',
    'Focus on improving areas mentioned in multiple reviews',
    'Highlight positive aspects in marketing materials'
  ]
  
  return {
    pros: pros.slice(0, 6),
    cons: cons.slice(0, 6),
    themes: themes.slice(0, 3),
    verdict,
    score: Math.round(avgRating * 10) / 10,
    suggestions
  }
}

export function parseRawReviews(rawText: string): Review[] {
  const reviews: Review[] = []
  const lines = rawText.split('\n').filter(line => line.trim().length > 0)
  
  lines.forEach(line => {
    const trimmed = line.trim()
    
    if (trimmed.length > 20) {
      const text = trimmed.toLowerCase()
      const positiveCount = ['excellent', 'good', 'outstanding', 'love', 'amazing', 'great', 'good', 'excellent', 'love', 'amazing'].filter(word => text.includes(word)).length
      const negativeCount = ['bad', 'terrible', 'awful', 'hate', 'poor', 'terrible', 'awful', 'hate'].filter(word => text.includes(word)).length
      
      let rating = 3
      if (positiveCount > negativeCount) {
        rating = Math.min(5, 3 + positiveCount)
      } else if (negativeCount > positiveCount) {
        rating = Math.max(1, 3 - negativeCount)
      }
      
      const review: Review = {
        author: null,
        rating,
        date: null,
        text: trimmed,
        helpful: Math.floor(Math.random() * 10)
      }
      reviews.push(review)
    }
  })
  
  return reviews
}

// Utility function for extracting domain from URLs (for future API integrations)
export function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '')
  } catch {
    return 'unknown'
  }
} 