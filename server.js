const express = require("express");
const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(express.json()); // to parse JSON request bodies
app.use(express.static("public")); // if you have static frontend files

// --- Existing routes ---
// e.g., scholarships
const scholarships = [
  { title: "Merit Scholarship A", description: "...", applyLink: "...", formLink: "..." },
  // ...
];
app.get("/scholarships", (req, res) => res.json(scholarships));

// --- Add the verification endpoint here ---
app.post("/check-dbt-status", (req, res) => {
  const { name, aadhaar, account } = req.body;

  if (!name || !aadhaar || !account) {
    return res.status(400).json({ status: "error", message: "All fields are required." });
  }

  const isDBTEnabled = parseInt(account.slice(-1)) % 2 === 0;

  res.json({
    name,
    aadhaar,
    account,
    dbtStatus: isDBTEnabled ? "DBT-enabled" : "Not DBT-enabled",
    message: isDBTEnabled
      ? "Congratulations! Your account is DBT-enabled."
      : "Your account is not DBT-enabled yet. Please check your bank/Aadhaar linkage."
  });
});

// --- Start the server ---
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
