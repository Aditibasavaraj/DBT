<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ad9cd4e9a488973653a8fbec08aca7ca4a3f1d26
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// --- Sample Users (fake database) ---
const users = {
  "user@example.com": { password: "123456", name: "Test User" },
  "anjali@example.com": { password: "password123", name: "Anjali" },
};

// --- Scholarships Data ---
=======
// --- Sample DBT Accounts Data ---
// Key: Aadhaar, Value: Account number
const dbtAccounts = {
  "123412341234": { account: "111122223333", bank: "State Bank of India" },
  "987698769876": { account: "444455556666", bank: "HDFC Bank" },
  // Add more sample data here
};

// --- Scholarships Data (optional if you use scholarships page) ---
>>>>>>> ad9cd4e9a488973653a8fbec08aca7ca4a3f1d26
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

<<<<<<< HEAD
// --- DBT Accounts Data ---
const dbtAccounts = {
  "123412341234": { account: "111122223333", bank: "State Bank of India" },
  "987698769876": { account: "444455556666", bank: "HDFC Bank" },
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
        message: ✅ Your account is DBT-enabled${bankMsg},
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
  console.log(Server running at http://localhost:${PORT})
);
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Sample DBT Accounts Data ---
const dbtAccounts = {
  "123412341234": { account: "111122223333", bank: "State Bank of India" },
  "987698769876": { account: "444455556666", bank: "HDFC Bank" },
};

// --- DBT Verification Endpoint ---
=======
// --- Routes ---
// Scholarships endpoint
app.get("/scholarships", (req, res) => res.json(scholarships));

// DBT Verification endpoint
>>>>>>> ad9cd4e9a488973653a8fbec08aca7ca4a3f1d26
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
<<<<<<< HEAD
=======
      // Optional: Check bank name if provided
>>>>>>> ad9cd4e9a488973653a8fbec08aca7ca4a3f1d26
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

<<<<<<< HEAD
// --- Start Server ---
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
=======
// --- Start server ---
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
=======
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

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

// --- Start server ---
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
>>>>>>> friend/main
>>>>>>> ad9cd4e9a488973653a8fbec08aca7ca4a3f1d26
