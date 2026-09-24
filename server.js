const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Static Frontend Files Serving ---
app.use(express.static(__dirname));

// --- Sample DBT Accounts Data ---
// Key: Aadhaar, Value: Account number
const dbtAccounts = {
  "123412341234": { account: "111122223333", bank: "State Bank of India" },
  "987698769876": { account: "444455556666", bank: "HDFC Bank" },
  // Add more sample data here
};

// --- User Data for Authentication ---
const users = [
  {
    id: 1,
    email: "admin@dbt.com",
    password: "admin123",
    name: "Admin User",
    role: "admin"
  },
  {
    id: 2,
    email: "student@example.com",
    password: "student123",
    name: "Student User",
    role: "student"
  },
  {
    id: 3,
    email: "demo@test.com",
    password: "demo123",
    name: "Demo User",
    role: "student"
  }
];

// --- Scholarships Data (optional if you use scholarships page) ---
const scholarships = [
  {
    title: "Merit Scholarship A",
    description: "For students with excellent academic records.",
    applyLink: "#",
    formLink: "#",
  },
  {
    title: "Merit Scholarship B",
    description: "For students from rural areas with high potential.",
    applyLink: "#",
    formLink: "#",
  },
];

// --- Students & Notifications Data (loaded from dbtData.json with fallback) ---
let studentsData = [
  {
    aadhaar: "123456789012",
    name: "Aditi Basavaraj",
    dbtStatus: "Ready for DBT",
    scholarships: [
      "Merit Scholarship 2025",
      "STEM Excellence Award"
    ],
    notifications: [
      { type: "info", message: "New scholarship applications open from 1st Oct." },
      { type: "alert", message: "Verify your Aadhaar-seeded account to receive DBT." }
    ]
  },
  {
    aadhaar: "987654321098",
    name: "Ravi Kumar",
    dbtStatus: "Not linked",
    scholarships: [
      "Arts Scholarship 2025"
    ],
    notifications: [
      { type: "warning", message: "KYC refresh required." }
    ]
  }
];

try {
  const dbtDataRaw = fs.readFileSync(path.join(__dirname, "dbtData.json"), "utf8");
  const parsedDbtData = JSON.parse(dbtDataRaw);
  if (parsedDbtData && Array.isArray(parsedDbtData.students)) {
    studentsData = parsedDbtData.students;
  }
} catch (err) {
  console.warn("Notice: Using fallback student data (dbtData.json read error:", err.message, ")");
}

// --- Routes ---
// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required."
    });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // In a real application, you would generate a JWT token here
    return res.json({
      status: "success",
      message: `Welcome back, ${user.name}!`,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } else {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password. Please try again."
    });
  }
});

// Scholarships endpoint
app.get("/scholarships", (req, res) => res.json(scholarships));

// DBT Verification endpoint
app.post("/check-dbt-status", (req, res) => {
  const { name, aadhaar, account, bank } = req.body;

  if (!name || !aadhaar || !account) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required." });
  }

  const user = dbtAccounts[aadhaar];

  if (user) {
    if (user.account === account) {
      // Optional: Check bank name if provided
      let bankMsg = "";
      if (bank && user.bank && bank.toLowerCase() !== user.bank.toLowerCase()) {
        bankMsg = ` (Note: entered bank "${bank}" differs from DBT bank "${user.bank}")`;
      }

      return res.json({
        name,
        aadhaar,
        account,
        bank: bank || user.bank,
        dbtStatus: "DBT-enabled",
        message: `✅ Your account is DBT-enabled${bankMsg}`,
      });
    } else {
      return res.json({
        name,
        aadhaar,
        account,
        bank,
        dbtStatus: "Not linked",
        message: "❌ Aadhaar linked to a different account.",
      });
    }
  } else {
    return res.json({
      name,
      aadhaar,
      account,
      bank,
      dbtStatus: "Not linked",
      message: "❌ Aadhaar not linked to any account.",
    });
  }
});

// Student Notifications endpoint
app.get("/students/:aadhaar", (req, res) => {
  const { aadhaar } = req.params;
  const student = studentsData.find((s) => s.aadhaar === aadhaar);

  if (student) {
    return res.json(student);
  } else {
    return res.status(404).json({
      status: "error",
      message: "Student record not found."
    });
  }
});

// --- Start server ---
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
