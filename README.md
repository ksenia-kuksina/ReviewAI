# ReviewMind AI 🚀

**Let AI read 1000+ reviews for you** - AI-powered review analysis platform that extracts and analyzes product reviews from any URL.

## ✨ Features

- 🔗 **URL Analysis**: Paste product links from Amazon, AliExpress, eBay, and more
- 📝 **Text Analysis**: Paste raw review text for instant analysis
- 🤖 **Real AI Analysis**: Powered by OpenAI GPT-4 for intelligent insights
- 📊 **Structured Results**: Pros, Cons, Verdict, Score, and Top Themes
- 🎯 **Multi-Platform Support**: Amazon, AliExpress, eBay, and generic sites
- 📱 **Responsive Design**: Works perfectly on all devices
- 🚀 **Fast & Efficient**: Analysis completed in seconds

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Inter font
- **AI**: OpenAI GPT-4 API integration
- **Scraping**: Cheerio + Axios for review extraction
- **Deployment**: Ready for Vercel/Netlify

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd ReviewMind-AI
npm install
```

### 2. Set up OpenAI API Key
Create `.env.local` file:
```bash
OPENAI_API_KEY=sk-your_actual_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
```

**Get API Key**: [OpenAI Platform](https://platform.openai.com/)

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔍 How It Works

### URL Analysis Flow
1. **Paste URL** → Product link from any supported marketplace
2. **AI Extraction** → Automatically extracts reviews from the page
3. **AI Analysis** → GPT-4 analyzes reviews for insights
4. **Get Results** → Structured analysis with pros, cons, verdict, score, themes

### Text Analysis Flow
1. **Paste Reviews** → Raw review text input
2. **AI Processing** → GPT-4 analyzes the text
3. **Instant Results** → Same structured output format

## 📱 Supported Platforms

| Platform | Review Extraction | AI Analysis |
|----------|------------------|--------------|
| **Amazon** | ✅ Full support | ✅ GPT-4 powered |
| **AliExpress** | ✅ Full support | ✅ GPT-4 powered |
| **eBay** | ✅ Full support | ✅ GPT-4 powered |
| **Generic Sites** | 🔍 Attempts extraction | ✅ GPT-4 powered |

## 🎯 Analysis Output

Every analysis provides:

- **⭐ Score**: 1.0-5.0 rating based on review sentiment
- **👍 Pros**: Up to 6 key positive points
- **👎 Cons**: Up to 6 key negative points  
- **🎯 Verdict**: 1-2 sentence summary
- **🔍 Top Themes**: 3-5 recurring themes with descriptions
- **📊 Data Stats**: Review count, date range, sources

## 🔧 Configuration

### Environment Variables
```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4-turbo-preview
```

### Custom AI Prompts
Modify the analysis prompt in `lib/review-analyzer.ts`:
```typescript
content: `You are a strict, concise review analyst. Summarize diverse user reviews into balanced Pros, Cons, Verdict, Score (1–5, one decimal), and 3–5 recurring Themes. Penalize patterns like 'fake/damaged', 'battery issues', 'fit/size'. Be specific, avoid hype, cite no brands unless present.`
```

## 📁 Project Structure

```
ReviewMind-AI/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── analyze-url/   # URL analysis endpoint
│   │   └── analyze-text/  # Text analysis endpoint
│   ├── result/[id]/       # Results page
│   ├── privacy/           # Privacy policy
│   └── terms/             # Terms of service
├── lib/                   # Core logic
│   ├── review-analyzer.ts # AI analysis & scraping
│   ├── config.ts          # Configuration
│   └── utils.ts           # Utility functions
├── components/            # React components
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Netlify
1. Build: `npm run build`
2. Deploy to Netlify
3. Set environment variables

### Manual
```bash
npm run build
npm start
```

## ⚠️ Important Notes

- **API Costs**: Each analysis costs money based on OpenAI pricing
- **Rate Limits**: Implement rate limiting for production use
- **Legal Compliance**: Respect websites' terms of service
- **Privacy**: Review data is not stored permanently

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [SETUP.md](./SETUP.md)
- **Issues**: GitHub Issues
- **Contact**: support@reviewmind.ai

---

**Built with ❤️ and AI** - Making product research smarter, one review at a time.