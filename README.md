# AI Campaign Generator, Sales Pitch & Predictive Insights

A full-stack web application that uses **Google's Generative AI API** to generate:
- 🎯 **AI Campaign Generator** - Comprehensive marketing strategies
- 💼 **AI Sales Pitch** - Customized sales pitches for any audience
- 📈 **Predictive Business Insights** - Data-driven market forecasts

## Features

✅ **Structured Outputs** - Well-formatted, actionable insights
✅ **Accurate AI** - Temperature-tuned prompts for consistency
✅ **Real-time Generation** - Fast responses from Google Generative AI
✅ **Demo Mode** - Works offline with fallback mock outputs
✅ **Professional UI** - Modern glassmorphism design with dark theme

## Prerequisites

- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **Google Generative AI API Key** - [Get Free Key](https://makersuite.google.com/app/apikey)

## Setup Steps

### 1. Install Node.js
Download and install from https://nodejs.org/ (choose LTS version)

### 2. Get Your Google API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key

### 3. Configure Environment
Create a `.env` file in the project directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your API key:
```
GOOGLE_API_KEY=your_copied_api_key_here
PORT=3000
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start the Server
```bash
npm start
```

The server will run at: **http://localhost:3000**

## Usage

### Campaign Generator
1. Enter: Company name, Product, Target Audience, Tone
2. Click "Generate Strategy"
3. Get: Campaign name, key messages, channels, budget allocation, KPIs

### Sales Pitch
1. Enter: Product name, Customer segment, Problem to solve
2. Click "Generate Pitch"
3. Get: Email subject line, hook, benefits, social proof, CTA

### Predictive Business Insights
1. Enter: Company/Product context and any business data
2. Click "Analyze"
3. Get: Market trends, risk alerts, recommended actions, KPIs to monitor

## API Endpoints

### POST /api/campaign
Generate marketing campaign strategy
```json
{
  "company": "TechCorp",
  "product": "CloudSync",
  "audience": "SMBs in India",
  "tone": "Professional"
}
```

### POST /api/salespitch
Generate customized sales pitch
```json
{
  "company": "TechCorp",
  "product": "CloudSync",
  "audience": "HR managers",
  "length": "concise"
}
```

### POST /api/insights
Generate predictive business insights
```json
{
  "company": "TechCorp",
  "product": "CloudSync",
  "dataContext": "Revenue grew 25% YoY, CAC reduced to ₹5000"
}
```

## Demo Mode

If the server is not running or API key is not configured, the UI automatically displays **demo/fallback outputs** so you can still see the UI in action.

To use live AI outputs, ensure:
- Server is running (`npm start`)
- `.env` has a valid `GOOGLE_API_KEY`
- Check browser console for any fetch errors

## Troubleshooting

### "npm: The term 'npm' is not recognized"
**Solution:** Install Node.js from https://nodejs.org/

### "GOOGLE_API_KEY not set in .env"
**Solution:** 
1. Create `.env` file (copy from `.env.example`)
2. Add your API key from https://makersuite.google.com/app/apikey
3. Restart the server

### "Error connecting to API"
**Solution:**
1. Verify API key is valid
2. Check internet connection
3. API may be rate-limited - wait a few minutes

## Project Structure

```
.
├── index.html          # Main UI (Dashboard, forms, results)
├── script.js          # Client-side logic (fetch, handlers)
├── style.css          # Modern dark theme styling
├── server.js          # Node/Express proxy server
├── package.json       # Dependencies
├── .env.example       # Example env config
└── README.md          # This file
```

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Backend:** Node.js, Express.js
- **AI:** Google Generative AI API (text-bison-001)
- **Charts:** Chart.js for dashboard visualizations

## Security Notes

⚠️ **IMPORTANT:** Never commit your `.env` file to git. Add it to `.gitignore`:

```
.env
node_modules/
```

API keys should be kept private and rotated regularly.

## License

MIT

---

**Questions or feedback?** Check the browser console (F12) for detailed error messages.
