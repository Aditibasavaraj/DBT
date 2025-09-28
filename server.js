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
