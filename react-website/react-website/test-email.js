const apiKey = "re_7QCQPU1M_BMKSeTdg7cP5nm91vJoGzVYR";
fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'TECHNOVA 2026 <onboarding@gparwal.webskr.in>',
    to: ['draj88540@gmail.com'],
    subject: 'Test Email from TECHNOVA',
    html: '<p>Bhai, this is a test email sent directly using Node.js script. Agar ye aa gaya matlab API key aur domain sab sahi hai!</p>'
  })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
