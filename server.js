const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.warn('Warning: GOOGLE_API_KEY not set in .env. Requests will fail without it.');
}

app.use(express.json());
app.use(express.static(__dirname));

async function callGoogleGenerative(promptText, opts = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${API_KEY}`;
  const body = {
    prompt: { text: promptText },
    temperature: opts.temperature ?? 0.3,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: opts.maxOutputTokens ?? 1024
  };

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      timeout: 30000
    });

    if (!resp.ok) {
      const error = await resp.text();
      throw new Error(`API Error ${resp.status}: ${error}`);
    }

    const json = await resp.json();
    const text = json?.candidates?.[0]?.output || 
                 json?.candidates?.[0]?.content || 
                 json?.output?.[0]?.content || 
                 JSON.stringify(json);
    return text;
  } catch (err) {
    throw new Error(`Google API call failed: ${err.message}`);
  }
}

// ===== CAMPAIGN ENDPOINT =====
app.post('/api/campaign', async (req, res) => {
  try {
    const { company, product, audience, tone } = req.body;

    const prompt = `You are an expert marketing strategist. Create a detailed marketing campaign brief with the following specifications:

Company: ${company || 'Your Company'}
Product/Service: ${product}
Target Audience: ${audience}
Tone: ${tone || 'Professional'}

Provide the output in the following exact format:

**Campaign Name:** [Create a compelling campaign name]

**Campaign Objective:** [Clear, measurable objective]

**Key Messages (3):**
1. [Message 1]
2. [Message 2]
3. [Message 3]

**Marketing Channels (3):**
1. [Channel 1 with brief rationale]
2. [Channel 2 with brief rationale]
3. [Channel 3 with brief rationale]

**Sample Ad Copy:**
Headline: [Compelling headline]
Body: [Engaging description]

**Budget Allocation:**
- Content/Creative: 30%
- Media Spend: 50%
- Tools/Analytics: 20%

**Key Performance Indicators (KPIs):**
1. Click-Through Rate (CTR): Target [X]%
2. Conversion Rate: Target [Y]%
3. Customer Acquisition Cost (CAC): Target ₹[Z]
4. Return on Ad Spend (ROAS): Target [W]x

**Timeline:** 90-day campaign sprint
**Expected Reach:** [Estimate reach based on audience size and channels]

Be specific, actionable, and data-driven. Avoid generic suggestions.`;

    const result = await callGoogleGenerative(prompt, { temperature: 0.2, maxOutputTokens: 1200 });
    res.json({ result });
  } catch (err) {
    console.error('Campaign error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== SALES PITCH ENDPOINT =====
app.post('/api/salespitch', async (req, res) => {
  try {
    const { company, product, audience, length } = req.body;

    const prompt = `You are an expert sales professional. Write a compelling sales pitch with the following context:

Company: ${company || 'Your Company'}
Product/Service: ${product}
Target Customer: ${audience}
Pitch Length: ${length === 'detailed' ? 'detailed (2-3 min read)' : 'concise (1 min read)'}

Provide the output in the following exact format:

**Email Subject Line:**
${length === 'detailed' ? '[2-3 alternative subject lines offered]' : '[1 compelling subject line]'}

**Opening Hook (1-2 sentences):**
[Attention-grabbing statement that resonates with the customer\'s pain point]

**Problem Statement:**
[Clearly articulate the customer\'s #1 problem]

**Solution Benefits (3 key benefits):**
1. [Benefit 1 - Quantified impact]
2. [Benefit 2 - Quantified impact]
3. [Benefit 3 - Quantified impact]

**Social Proof / Credibility:**
[Include relevant credential, case study reference, or authority marker]

**Pricing/Value Proposition:**
[Concise explanation of value vs. cost]

**Call-to-Action (CTA):**
[Clear, specific next step]

**Closing:**
[Professional, warm closing statement]

${length === 'detailed' ? '**Case Study Highlight:** [Brief win/story from similar customer]' : ''}

Be persuasive, specific, and customer-focused. Use quantifiable results where possible.`;

    const result = await callGoogleGenerative(prompt, { temperature: 0.2, maxOutputTokens: 1000 });
    res.json({ result });
  } catch (err) {
    console.error('Pitch error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== PREDICTIVE INSIGHTS ENDPOINT =====
app.post('/api/insights', async (req, res) => {
  try {
    const { company, product, dataContext } = req.body;

    const prompt = `You are a business analyst and market researcher. Provide predictive business insights given the following context:

Company: ${company || 'Your Company'}
Product/Service: ${product}
Business Context/Data: ${dataContext || 'General market analysis'}

Provide actionable insights in the following exact format:

**Market Analysis:**
[2-3 sentences on current market conditions and trends]

**Predictive Insights (Next 6 Months):**
1. **Trend:** [Specific trend prediction with confidence level]
   Impact: [Positive/Negative/Mixed]
   Prepare by: [Actionable prep step]

2. **Trend:** [Specific trend prediction with confidence level]
   Impact: [Positive/Negative/Mixed]
   Prepare by: [Actionable prep step]

3. **Trend:** [Specific trend prediction with confidence level]
   Impact: [Positive/Negative/Mixed]
   Prepare by: [Actionable prep step]

**Recommended Actions (Priority Order):**
1. [High-impact action with expected ROI estimate]
2. [Medium-term optimization]
3. [Long-term strategic play]

**Key Metrics to Monitor (Weekly/Monthly):**
- Metric 1: [What to track and why]
- Metric 2: [What to track and why]
- Metric 3: [What to track and why]
- Metric 4: [What to track and why]

**Risk Alerts:**
⚠️ [Risk 1 and mitigation strategy]
⚠️ [Risk 2 and mitigation strategy]

**Opportunity Window:**
[Specific 30-60 day window and why it matters]

Be data-driven, specific, and forward-thinking. Avoid generic advice.`;

    const result = await callGoogleGenerative(prompt, { temperature: 0.1, maxOutputTokens: 1500 });
    res.json({ result });
  } catch (err) {
    console.error('Insights error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Proxy Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints available:`);
  console.log(`   POST /api/campaign`);
  console.log(`   POST /api/salespitch`);
  console.log(`   POST /api/insights`);
});
