export default async function handler(req, res) {
  // CORS setup if you ever call this from another domain, but Vercel handles same-domain by default
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { to, subject, html } = req.body;
  const apiKey = process.env.VITE_RESEND_API_KEY; 

  if (!apiKey) {
    return res.status(500).json({ error: 'Resend API Key is not configured on the server.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'TECHNOVA 2026 <onboarding@gparwal.webskr.in>', 
        to: to,
        subject: subject,
        html: html
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
