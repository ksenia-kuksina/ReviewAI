# Setup Instructions for ReviewMind AI

## 🔑 OpenAI API Setup

To enable real AI analysis of reviews, you need to set up your OpenAI API key:

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the key (it starts with `sk-`)

### 2. Set Environment Variable
Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=sk-your_actual_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
```

### 3. Alternative: Update Config File
If you can't create `.env.local`, update `lib/config.ts`:

```typescript
export const config = {
  openai: {
    apiKey: 'sk-your_actual_api_key_here',
    model: 'gpt-4-turbo-preview',
  },
}
```

## 🚀 Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## 🔍 How It Works

### With API Key (Real AI Analysis):
- Paste product URL from Amazon, AliExpress, eBay, etc.
- AI extracts reviews from the page
- OpenAI analyzes reviews and generates insights
- Returns structured analysis with pros, cons, verdict, score, and themes

### Without API Key (Fallback Mode):
- Uses rule-based analysis as fallback
- Still extracts reviews from URLs
- Provides basic analysis based on keyword matching

## 📱 Supported Platforms

- **Amazon**: Full review extraction and analysis
- **AliExpress**: Review extraction with AI analysis
- **eBay**: Review extraction with AI analysis
- **Generic sites**: Attempts to find review-like content

## ⚠️ Important Notes

1. **Rate Limits**: OpenAI has rate limits. For production use, consider implementing rate limiting.
2. **Costs**: Each analysis costs money based on OpenAI's pricing.
3. **Privacy**: Review data is not stored permanently, only processed for analysis.
4. **Legal**: Ensure you comply with websites' terms of service when scraping.

## 🛠️ Customization

You can modify the AI prompt in `lib/review-analyzer.ts` to change how reviews are analyzed:

```typescript
content: `You are a strict, concise review analyst. Summarize diverse user reviews into balanced Pros, Cons, Verdict, Score (1–5, one decimal), and 3–5 recurring Themes. Penalize patterns like 'fake/damaged', 'battery issues', 'fit/size'. Be specific, avoid hype, cite no brands unless present.`
```

## 🚀 Deployment

The app is ready for deployment on Vercel, Netlify, or any Next.js-compatible platform.

Remember to set your environment variables in your deployment platform! 