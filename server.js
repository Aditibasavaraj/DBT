// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");  // add this after other require statements

const app = express();
const PORT = 5000;
app.use(express.static(path.join(__dirname)));  // <-- new line


// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Sample DBT Accounts Data ---
const dbtAccounts = {
  "123412341234": { account: "111122223333", bank: "State Bank of India" },
  "987698769876": { account: "444455556666", bank: "HDFC Bank" },
  "111122223333": { account: "777788889999", bank: "ICICI Bank" }, // Added third account
};

// --- Sample Users Data ---
const users = [
  { id: 1, email: "admin@dbt.com", password: "admin123", name: "Admin User", role: "admin", level: "advanced" },
  { id: 2, email: "student@example.com", password: "student123", name: "Student User", role: "student", level: "beginner" },
  { id: 3, email: "demo@test.com", password: "demo123", name: "Demo User", role: "student", level: "intermediate" }
];

// --- Sample Scholarships Data ---
const scholarships = [
  { title: "Merit Scholarship A", description: "For students with excellent academic records.", applyLink: "#", formLink: "#" },
  { title: "Merit Scholarship B", description: "For students from rural areas with high potential.", applyLink: "#", formLink: "#" }
];

// ---------------- ROUTES ----------------

// 1. Scholarships endpoint
app.get("/scholarships", (req, res) => res.json(scholarships));

// 2. Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "Email and password are required" });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return res.json({ status: "success", message: `Welcome back, ${user.name}!`, user: userWithoutPassword });
  } else {
    return res.status(401).json({ status: "error", message: "Invalid email or password" });
  }
});

// 3. DBT Verification endpoint
app.post("/check-dbt-status", (req, res) => {
  const { name, aadhaar, account, bank, userId } = req.body;

  if (!userId) {
    return res.status(401).json({ status: "error", message: "Authentication required: userId is missing" });
  }

  if (!name || !aadhaar || !account) {
    return res.status(400).json({ status: "error", message: "Name, Aadhaar, and Account Number are required" });
  }

  const userDbtInfo = dbtAccounts[aadhaar];

  if (userDbtInfo) {
    if (userDbtInfo.account === account) {
      let bankMsg = "";
      if (bank && userDbtInfo.bank && bank.toLowerCase() !== userDbtInfo.bank.toLowerCase()) {
        bankMsg = ` (Note: You entered "${bank}", but our records show "${userDbtInfo.bank}")`;
      }
      return res.json({
        name,
        aadhaar,
        account,
        bank: bank || userDbtInfo.bank,
        dbtStatus: "DBT-enabled",
        message: `✅ Your account is DBT-enabled for this Aadhaar and Account Number.${bankMsg}`
      });
    } else {
      return res.json({
        name,
        aadhaar,
        account,
        bank,
        dbtStatus: "Not linked",
        message: "❌ Aadhaar found, but it is linked to a different account number."
      });
    }
  } else {
    return res.json({
      name,
      aadhaar,
      account,
      bank,
      dbtStatus: "Not linked",
      message: "❌ This Aadhaar number is not found in our DBT records."
    });
  }
});

// 4. Optional: Register endpoint
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ status: "error", message: "All fields are required" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ status: "error", message: "User already exists" });
  }

  const newUser = { id: users.length + 1, name, email, password, role: "student", level: "beginner" };
  users.push(newUser);

  const { password: pwd, ...userWithoutPassword } = newUser;
  return res.json({ status: "success", message: "Registration successful", user: userWithoutPassword });
});

// --- Start the server ---
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
