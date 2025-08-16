# Test URLs for ReviewMind AI

## 🧪 Testing the Application

Use these URLs to test the review analysis functionality:

### Amazon Products
- **Wireless Earbuds**: `https://www.amazon.com/dp/B08C7KG5LP`
- **Smartphone**: `https://www.amazon.com/dp/B09G9HD6PD`
- **Laptop**: `https://www.amazon.com/dp/B08N5WRWNW`

### AliExpress Products
- **Phone Case**: `https://www.aliexpress.com/item/1005001234567890.html`
- **Headphones**: `https://www.aliexpress.com/item/1005002345678901.html`

### eBay Products
- **Gaming Console**: `https://www.ebay.com/itm/123456789012`
- **Camera**: `https://www.ebay.com/itm/234567890123`

## 🔍 How to Test

1. **Start the app**: `npm run dev`
2. **Open**: http://localhost:3000
3. **Paste any URL** from above
4. **Click "Analyze Reviews"**
5. **Wait for AI analysis** (usually 5-15 seconds)
6. **View results** on the results page

## ⚠️ Important Notes

- **Real URLs**: These are example URLs - replace with actual product URLs
- **API Key**: Make sure you have set up your OpenAI API key
- **Rate Limits**: Don't test too frequently to avoid hitting API limits
- **Legal**: Only test with products you have permission to analyze

## 🚀 Expected Results

Each analysis should return:
- ✅ Product information (title, image if available)
- ✅ Review count and date range
- ✅ AI-generated pros and cons
- ✅ Verdict and score
- ✅ Top recurring themes
- ✅ Export and share options 