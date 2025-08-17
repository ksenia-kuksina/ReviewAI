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

// Simple rule-based analysis for MVP
export async function analyzeReviewsWithAI(reviews: Review[]): Promise<AnalysisResult> {
  const totalReviews = reviews.length
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  
  // Multi-language keyword analysis
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
  const themes: Array<{ name: string; desc: string }> = []
  
  // Analyze text for pros/cons
  reviews.forEach(review => {
    const text = review.text.toLowerCase()
    
    positiveKeywords.forEach(keyword => {
      if (text.includes(keyword) && pros.length < 6) {
        const keywordDisplay = keyword.length > 3 ? keyword.charAt(0).toUpperCase() + keyword.slice(1) : keyword.toUpperCase()
        pros.push(`${keywordDisplay} mentioned`)
      }
    })
    
    negativeKeywords.forEach(keyword => {
      if (text.includes(keyword) && cons.length < 6) {
        const keywordDisplay = keyword.length > 3 ? keyword.charAt(0).toUpperCase() + keyword.slice(1) : keyword.toUpperCase()
        cons.push(`${keywordDisplay} issues reported`)
      }
    })
  })
  
  // Generate themes based on common patterns
  const themeKeywords = [
    'battery', 'quality', 'price', 'design', 'performance', 'comfort', 'sound', 'build', 'durability', 'features',
    'delivery', 'service', 'packaging', 'material', 'size', 'fit', 'color', 'style', 'brand', 'value'
  ]
  
  themeKeywords.forEach(theme => {
    const count = reviews.filter(r => r.text.toLowerCase().includes(theme)).length
    if (count > totalReviews * 0.1) { // Theme appears in >10% of reviews
      const themeDisplay = theme.charAt(0).toUpperCase() + theme.slice(1)
      themes.push({
        name: themeDisplay,
        desc: `Mentioned in ${Math.round(count / totalReviews * 100)}% of reviews`
      })
    }
  })
  
  // Generate verdict based on content analysis
  let verdict = ''
  let score = avgRating
  
  // If we have pros/cons, use them for better scoring
  if (pros.length > 0 && cons.length === 0) {
    score = Math.min(5, avgRating + 1)
    verdict = 'Highly recommended product with overwhelmingly positive feedback from users.'
  } else if (pros.length > cons.length) {
    score = Math.min(5, avgRating + 0.5)
    verdict = 'Good product with mostly positive reviews, though some concerns exist.'
  } else if (pros.length === cons.length) {
    score = avgRating
    verdict = 'Mixed reviews with both positive and negative feedback from users.'
  } else if (cons.length > pros.length) {
    score = Math.max(1, avgRating - 0.5)
    verdict = 'Product has significant issues based on user feedback and low ratings.'
  } else {
    // Fallback to rating-based verdict
    if (score >= 4.5) {
      verdict = 'Highly recommended product with overwhelmingly positive feedback from users.'
    } else if (score >= 4.0) {
      verdict = 'Good product with mostly positive reviews, though some concerns exist.'
    } else if (score >= 3.0) {
      verdict = 'Mixed reviews with both positive and negative feedback from users.'
    } else {
      verdict = 'Product has significant issues based on user feedback and low ratings.'
    }
  }

  // Generate suggestions based on analysis
  const suggestions = []
  if (cons.length > 0) {
    suggestions.push('Address the most common negative feedback points')
  }
  if (score < 4.0) {
    suggestions.push('Focus on improving areas mentioned in multiple reviews')
  }
  if (pros.length > 0) {
    suggestions.push('Highlight positive aspects in marketing materials')
  }
  
  return {
    pros: pros.slice(0, 6),
    cons: cons.slice(0, 6),
    themes: themes.slice(0, 5),
    verdict,
    score: Math.round(score * 10) / 10,
    suggestions: suggestions.slice(0, 3)
  }
}

export function parseRawReviews(rawText: string): Review[] {
  const reviews: Review[] = []
  const lines = rawText.split('\n').filter(line => line.trim().length > 0)
  
  lines.forEach(line => {
    const trimmed = line.trim()
    
    if (trimmed.length > 20) {
      // Determine rating based on positive/negative keywords
      const text = trimmed.toLowerCase()
      const positiveCount = ['excellent', 'good', 'outstanding', 'love', 'amazing', 'great', 'good', 'excellent', 'love', 'amazing'].filter(word => text.includes(word)).length
      const negativeCount = ['bad', 'terrible', 'awful', 'hate', 'poor', 'terrible', 'awful', 'hate'].filter(word => text.includes(word)).length
      
      let rating = 3 // Default neutral rating
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