const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();

// 🔐 Certificats HTTPS
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
};

// ── Serveur démarré
app.listen(3000, '0.0.0.0', () => {
  console.log("🚀 HTTPS Cyber API running on https://localhost:3000");
});

// ── Frontend
app.use(express.static(path.join(__dirname, 'public')));

// ── API endpoints
app.get('/api', (req, res) => {
  res.json({
    message: "⚡ Welcome to Cyber API",
    status: "online",
    timestamp: new Date()
  });
});

app.get('/secure', (req, res) => {
  const token = req.headers['x-api-key'];

  if (token !== "cyber-secret") {
    return res.status(403).json({ error: "Access denied" });
  }

  res.json({
    secret: "🧠 Neural network access granted",
  });
});

app.get('/matrix', (req, res) => {
  res.json({
    code: "010101010101",
    reality: "simulated",
    system: "colima-docker-node"
  });
});
