// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JSON data path
const dataPath = path.join(__dirname, 'dbtData.json');

// Helper: read DBT data
function getDBTData() {
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

// API route to check DBT status (optional)
app.post('/check-dbt', (req, res) => {
  const { aadhaar, account } = req.body;
  if (!aadhaar || !account) return res.status(400).json({ error: 'Aadhaar and account required' });

  const dbtData = getDBTData();
  const record = dbtData.find(r => r.aadhaar === aadhaar && r.account === account);

  if (record) {
    res.json({ status: record.status });
  } else {
    res.json({ status: 'No record found' });
  }
});

// Static students data for notifications
const students = [
  {
    aadhaar: "123456789012",
    name: "Aditi Basavaraj",
    dbtStatus: "Ready for DBT",
    scholarships: ["Merit Scholarship 2025", "STEM Excellence Award"],
    notifications: [
      { type: "info", message: "New scholarship applications open from 1st Oct." },
      { type: "alert", message: "Verify your Aadhaar-seeded account to receive DBT." },
    ],
  },
  {
    aadhaar: "987654321098",
    name: "Ravi Kumar",
    dbtStatus: "Not linked",
    scholarships: ["Arts Scholarship 2025"],
    notifications: [{ type: "warning", message: "KYC refresh required." }],
  },
];

// Route to get student notifications
app.get("/students/:aadhaar", (req, res) => {
  const student = students.find((s) => s.aadhaar === req.params.aadhaar);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
