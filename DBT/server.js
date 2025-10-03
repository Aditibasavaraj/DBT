// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Sample Users (fake database) ---
const users = {
  "user@example.com": { password: "123456", name: "Test User" },
  "anjali@example.com": { password: "password123", name: "Anjali" },
};

// --- Scholarships Data ---
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

// --- DBT Accounts Data ---
const dbtAccounts = {
  "123412341234": { account: "111122223333", bank: "State Bank of India" },
  "987698769876": { account: "444455556666", bank: "HDFC Bank" },
  "111122223333": { account: "777788889999", bank: "ICICI Bank" }, // Added your third account back
};

// ---------------- ROUTES ----------------

// 1. Scholarships endpoint
app.get("/scholarships", (req, res) => res.json(scholarships));

// 2. DBT Verification endpoint
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
        // CORRECTED: backticks and proper emoji
        message: `✅ Your account is DBT-enabled${bankMsg}`,
      });
    } else {
      return res.json({
        name,
        aadhaar,
        account,
        bank,
        dbtStatus: "Not linked",
        // CORRECTED: proper emoji
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
      // CORRECTED: proper emoji
      message: "❌ Aadhaar not linked to any account.",
    });
  }
});

// 3. LOGIN endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Email and password are required" });
  }

  const user = users[email];

  if (!user || user.password !== password) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid email or password" });
  }

  return res.json({
    status: "success",
    message: "Login successful",
    user: { name: user.name, email },
  });
});

// 4. REGISTER endpoint (optional)
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  if (users[email]) {
    return res
      .status(409)
      .json({ status: "error", message: "User already exists" });
  }

  users[email] = { password, name };
  return res.json({
    status: "success",
    message: "Registration successful",
    user: { name, email },
  });
});

// --- Start server ---
app.listen(PORT, () =>
  // CORRECTED: backticks
  console.log(`Server running at http://localhost:${PORT}`)
);