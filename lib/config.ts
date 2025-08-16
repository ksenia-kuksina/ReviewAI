export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key_here',
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
  },
  // Add other API configurations here
} 