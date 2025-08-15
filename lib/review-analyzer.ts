import axios from 'axios'
import * as cheerio from 'cheerio'

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
}

// Mock AI analysis for now - replace with actual OpenAI/Anthropic API
export async function analyzeReviewsWithAI(reviews: Review[]): Promise<AnalysisResult> {
  // For MVP, we'll use a simple rule-based analysis
  // In production, this would call OpenAI/Anthropic API
  
  const totalReviews = reviews.length
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  
  // Simple keyword analysis
  const positiveKeywords = ['great', 'good', 'excellent', 'love', 'amazing', 'perfect', 'best', 'awesome', 'fantastic', 'wonderful']
  const negativeKeywords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'disappointing', 'poor', 'cheap', 'broken', 'useless']
  
  const pros: string[] = []
  const cons: string[] = []
  const themes: Array<{ name: string; desc: string }> = []
  
  // Analyze text for pros/cons
  reviews.forEach(review => {
    const text = review.text.toLowerCase()
    
    positiveKeywords.forEach(keyword => {
      if (text.includes(keyword) && pros.length < 6) {
        pros.push(`${keyword.charAt(0).toUpperCase() + keyword.slice(1)} mentioned`)
      }
    })
    
    negativeKeywords.forEach(keyword => {
      if (text.includes(keyword) && cons.length < 6) {
        cons.push(`${keyword.charAt(0).toUpperCase() + keyword.slice(1)} issues reported`)
      }
    })
  })
  
  // Generate themes based on common patterns
  const themeKeywords = ['battery', 'quality', 'price', 'design', 'performance', 'comfort', 'sound', 'build', 'durability', 'features']
  themeKeywords.forEach(theme => {
    const count = reviews.filter(r => r.text.toLowerCase().includes(theme)).length
    if (count > totalReviews * 0.1) { // Theme appears in >10% of reviews
      themes.push({
        name: theme.charAt(0).toUpperCase() + theme.slice(1),
        desc: `Mentioned in ${Math.round(count / totalReviews * 100)}% of reviews`
      })
    }
  })
  
  // Generate verdict
  let verdict = ''
  if (avgRating >= 4.5) {
    verdict = 'Highly recommended product with overwhelmingly positive feedback from users.'
  } else if (avgRating >= 4.0) {
    verdict = 'Good product with mostly positive reviews, though some concerns exist.'
  } else if (avgRating >= 3.0) {
    verdict = 'Mixed reviews with both positive and negative feedback from users.'
  } else {
    verdict = 'Product has significant issues based on user feedback and low ratings.'
  }
  
  return {
    pros: pros.slice(0, 6),
    cons: cons.slice(0, 6),
    themes: themes.slice(0, 5),
    verdict,
    score: Math.round(avgRating * 10) / 10
  }
}

export async function extractReviewsFromUrl(url: string): Promise<Review[]> {
  try {
    // For MVP, return mock data
    // In production, this would implement actual web scraping
    return generateMockReviews()
  } catch (error) {
    console.error('Error extracting reviews:', error)
    return []
  }
}

export function parseRawReviews(rawText: string): Review[] {
  const reviews: Review[] = []
  const lines = rawText.split('\n').filter(line => line.trim().length > 0)
  
  let currentReview: Partial<Review> = {}
  
  lines.forEach(line => {
    const trimmed = line.trim()
    
    // Simple parsing logic - can be enhanced
    if (trimmed.length > 20) {
      // Assume this is a review text
      const review: Review = {
        author: null,
        rating: Math.floor(Math.random() * 5) + 1, // Random rating for demo
        date: null,
        text: trimmed,
        helpful: Math.floor(Math.random() * 10)
      }
      reviews.push(review)
    }
  })
  
  return reviews
}

function generateMockReviews(): Review[] {
  const mockReviews: Review[] = [
    {
      author: "John D.",
      rating: 5,
      date: "2024-01-15",
      text: "Excellent sound quality and long battery life. These earbuds exceeded my expectations. The noise cancellation is amazing and they fit perfectly in my ears.",
      helpful: 12
    },
    {
      author: "Sarah M.",
      rating: 4,
      date: "2024-01-14",
      text: "Great earbuds overall. Sound quality is fantastic and they're very comfortable. Only minor issue is the case is a bit bulky, but that's not a deal breaker.",
      helpful: 8
    },
    {
      author: "Mike R.",
      rating: 3,
      date: "2024-01-13",
      text: "Good sound quality but the battery life could be better. They last about 4-5 hours which is okay but not great. The fit is comfortable though.",
      helpful: 5
    },
    {
      author: "Lisa K.",
      rating: 5,
      date: "2024-01-12",
      text: "Absolutely love these! The sound is crystal clear and they stay in place even during workouts. Battery life is impressive and the quick pairing feature works flawlessly.",
      helpful: 15
    },
    {
      author: "David L.",
      rating: 2,
      date: "2024-01-11",
      text: "Disappointed with the quality. The left earbud stopped working after a week. Customer service was helpful but still frustrating to have issues so soon.",
      helpful: 3
    },
    {
      author: "Emma W.",
      rating: 4,
      date: "2024-01-10",
      text: "Solid earbuds with great features. The noise cancellation works well and the sound quality is excellent. Price is a bit high but you get what you pay for.",
      helpful: 7
    },
    {
      author: "Alex P.",
      rating: 5,
      date: "2024-01-09",
      text: "Best wireless earbuds I've ever owned. The premium build quality is evident and the sound is incredible. Worth every penny for the audio experience.",
      helpful: 11
    },
    {
      author: "Maria S.",
      rating: 3,
      date: "2024-01-08",
      text: "Decent earbuds but not worth the high price. Sound quality is good but not exceptional. The app could be better and there's no wireless charging.",
      helpful: 4
    },
    {
      author: "Tom H.",
      rating: 4,
      date: "2024-01-07",
      text: "Very good earbuds with excellent sound quality. They're comfortable for long listening sessions and the battery life is solid. Minor connectivity issues sometimes.",
      helpful: 6
    },
    {
      author: "Anna B.",
      rating: 5,
      date: "2024-01-06",
      text: "Fantastic earbuds! The sound quality is amazing and they're incredibly comfortable. Battery life exceeds expectations and the noise cancellation is top-notch.",
      helpful: 13
    }
  ]
  
  return mockReviews
} 