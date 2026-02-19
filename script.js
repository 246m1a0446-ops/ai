function show(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Dashboard Random Values */
document.getElementById("leads").innerText =
  Math.floor(Math.random()*500+200);

document.getElementById("conversion").innerText =
  Math.floor(Math.random()*30+20) + "%";

document.getElementById("revenue").innerText =
  "₹" + Math.floor(Math.random()*80+20) + "L";

/* Chart */
new Chart(document.getElementById("chart"),{
  type:'line',
  data:{
    labels:["Jan","Feb","Mar","Apr","May","Jun"],
    datasets:[{
      label:"Revenue",
      data:Array.from({length:6},()=>Math.random()*100+50),
      borderColor:"#8b5cf6",
      tension:.4
    }]
  }
});

/* AI Features */

function generateCampaign(){
  const product = document.getElementById('cProduct').value || '';
  const audience = document.getElementById('cAudience').value || '';
  const goal = document.getElementById('cGoal').value || '';
  const outEl = document.getElementById('campaignOutput');
  outEl.innerHTML = 'Generating...';
    (async ()=>{
      const mock = `**Campaign Name:** ${product} Growth Initiative 2026

**Campaign Objective:** Increase market awareness and drive qualified leads for ${product} within ${audience} segment, targeting 25% increase in customer acquisition.

**Key Messages (3):**
1. Transform your workflow with AI-powered ${product}
2. Save 40% time and boost team productivity
3. Join 500+ successful companies trusting ${product}

**Marketing Channels (3):**
1. LinkedIn & Professional Networks - Reach decision makers in ${audience}
2. Content Marketing & SEO - Drive organic traffic with valuable resources
3. Email Campaigns - Nurture leads with personalized messaging

**Sample Ad Copy:**
Headline: Experience the Future of ${product}
Body: Join thousands of ${audience} professionals who've transformed their operations.

**Budget Allocation:**
- Content/Creative: 30%
- Media Spend: 50%
- Tools/Analytics: 20%

**Key Performance Indicators (KPIs):**
1. Click-Through Rate (CTR): Target 3.5%
2. Conversion Rate: Target 5.2%
3. Customer Acquisition Cost (CAC): Target ₹8,500
4. Return on Ad Spend (ROAS): Target 4.5x

**Timeline:** 90-day campaign sprint`;
      const text = await postWithMock('/api/campaign',{ company:'', product, audience, tone:'professional' }, mock);
      outEl.innerHTML = formatOutput(text);
    })();
}

function generatePitch(){
  let product = document.getElementById("pProduct").value;
  let segment = document.getElementById("pSegment").value;
  let problem = document.getElementById("pProblem").value;
  const outEl = document.getElementById('pitchOutput');
  outEl.innerHTML = 'Generating...';
    (async ()=>{
      const mock = `**Email Subject Line:**
"The ${problem} Solution ${segment} Teams Are Switching To"

**Opening Hook:**
Most ${segment} struggle with ${problem}, costing them thousands monthly. What if there's a proven way to eliminate that?

**Problem Statement:**
${segment} waste significant time on ${problem}, reducing productivity and missing opportunities.

**Solution Benefits:**
1. **Save 35% Time** - Automate repetitive tasks
2. **Reduce Costs by 40%** - Eliminate manual processes  
3. **Improve Quality by 60%** - Consistent, error-free outputs

**Social Proof:**
Trusted by 500+ leading companies

**Pricing/Value Proposition:**
ROI within 60 days through efficiency gains

**Call-to-Action:**
Schedule a 15-minute demo

**Closing:**
Looking forward to helping your team succeed.`;
      const text = await postWithMock('/api/salespitch',{ company:'', product, audience: segment, length:'concise' }, mock);
      outEl.innerHTML = formatOutput(text);
    })();
}

function scoreLead(){
  let score =
    lBudget.value*0.4 +
    lInterest.value*0.35 +
    lUrgency.value*0.25;

  document.getElementById("leadOutput").innerHTML =
    "Lead Score: " + score.toFixed(2);
}

function analyze(){
  const data = document.getElementById('bData').value || '';
  const outEl = document.getElementById('analysisOutput');
  outEl.innerHTML = 'Generating insights...';
    (async ()=>{
      const mock = `**Market Analysis:**
Current market conditions show strong growth momentum with increasing competition. Q1-Q2 2026 presents significant opportunity.

**Predictive Insights (Next 6 Months):**
1. **Trend:** Customer acquisition costs will rise 12-15% (90% confidence)
   Impact: Negative
   Prepare by: Diversify traffic sources and optimize landing pages

2. **Trend:** Demand for AI-driven solutions will grow 35-40% (85% confidence)
   Impact: Positive
   Prepare by: Highlight AI features in marketing immediately

3. **Trend:** Customer retention will improve 8-10% with proactive onboarding (75% confidence)
   Impact: Positive
   Prepare by: Implement welcome sequences

**Recommended Actions (Priority Order):**
1. Launch customer success program - Expected ROI: 3.2x within 6 months
2. Optimize pricing for enterprise deals - Potential revenue increase: 18%
3. Build strategic partnerships - Long-term growth multiplier

**Key Metrics to Monitor:**
- Customer Acquisition Cost (CAC) - Weekly tracking
- Customer Lifetime Value (CLV) - Monthly
- Churn Rate - Weekly
- Net Revenue Retention (NRR) - Monthly

**Risk Alerts:**
⚠️ Market saturation - Expand to tier-2/3 markets
⚠️ Competitive pricing pressure - Build unique features

**Opportunity Window:**
February-March 2026 ideal for campaign launch. Act within 30 days.`;
      const text = await postWithMock('/api/insights',{ company:'', product:'', dataContext: data }, mock);
      outEl.innerHTML = formatOutput(text);
    })();
}

  async function postWithMock(path, body, mockText){
    try{
      const res = await fetch(path,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      if(!res.ok) throw new Error(res.status+' '+res.statusText);
      const j = await res.json();
      return j.result || j.error || JSON.stringify(j);
    }catch(e){
      return mockText + "\n\n(Note: showing demo fallback because the server is not reachable or returned an error.)";
    }
  }

function formatOutput(text){
  const container = document.createElement('div');
  container.className = 'output-container';
  
  const lines = text.split('\n');
  let currentSection = null;
  let html = '';
  
  for(let i = 0; i < lines.length; i++){
    const line = lines[i].trim();
    if(!line) continue;
    
    // Section headers (bold text ending with colon)
    if(line.match(/^\*\*[^*]+\*\*:?$/)){
      if(currentSection) html += '</div></div>';
      const title = line.replace(/\*\*/g, '').replace(':', '');
      let icon = '📋';
      if(title.includes('Objective') || title.includes('Goal')) icon = '🎯';
      if(title.includes('Message') || title.includes('Benefit') || title.includes('Action')) icon = '✓';
      if(title.includes('Channel') || title.includes('KPI') || title.includes('Metric')) icon = '📊';
      if(title.includes('Ad') || title.includes('Subject')) icon = '📢';
      if(title.includes('Risk') || title.includes('Alert')) icon = '⚠️';
      if(title.includes('Trend') || title.includes('Insight')) icon = '📈';
      if(title.includes('Timeline') || title.includes('Window')) icon = '⏱️';
      
      html += `<div class="output-section">
        <div class="section-header">
          <span class="section-icon">${icon}</span>
          <span class="section-title">${title}</span>
        </div>
        <div class="section-content">`;
      currentSection = true;
    }
    // Risk alerts
    else if(line.startsWith('⚠️')){
      const alert = line.replace('⚠️', '').trim();
      html += `<div class="risk-alert"><span class="risk-icon">⚠️</span>${alert}</div>`;
    }
    // Numbered items
    else if(line.match(/^\d+\./)){
      const itemText = line.replace(/^\d+\.\s*/, '');
      if(itemText.includes('Benefit') || itemText.includes('Save ') || itemText.includes('Reduce ') || itemText.includes('Improve ')){
        const parts = itemText.split(' - ');
        html += `<div class="benefit-item"><span class="benefit-label">BENEFIT</span><br>${itemText}</div>`;
      }else if(itemText.includes('Launch') || itemText.includes('Optimize') || itemText.includes('Build')){
        const parts = itemText.split(' - ');
        html += `<div class="action-item"><span class="action-label">ACTION</span><br>${itemText}</div>`;
      }else if(itemText.includes('Trend') || itemText.includes('Metric')){
        html += `<div class="action-item"><strong>${itemText}</strong></div>`;
      }else{
        html += `<div style="margin-bottom:8px;">• ${itemText}</div>`;
      }
    }
    // Bullet points
    else if(line.startsWith('- ')){
      html += `<div style="margin-bottom:6px; margin-left:12px;">• ${line.substring(2)}</div>`;
    }
    // Key value pairs (text: value)
    else if(line.includes(':') && !line.includes('**')){
      const parts = line.split(/:(.+)/);
      const key = parts[0].trim();
      const val = parts[1]?.trim() || '';
      if(key.includes('Impact') || key.includes('Prepare') || key.includes('Mitigation')){
        html += `<div style="margin-bottom:8px;"><strong style="color:#a78bfa;">${key}:</strong> ${val}</div>`;
      }else{
        html += `<div style="margin-bottom:6px;"><strong>${key}:</strong> ${val}</div>`;
      }
    }
    // Regular text
    else if(line && line !== '(Note: showing demo fallback because the server is not reachable or returned an error.)'){
      html += `<div style="margin-bottom:8px;">${line}</div>`;
    }
  }
  
  if(currentSection) html += '</div></div>';
  container.innerHTML = html;
  return container.outerHTML;
}
