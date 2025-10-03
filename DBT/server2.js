<<<<<<< HEAD
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>DBT Checker</title>
  <script>
    async function checkDBTStatus(event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const aadhaar = document.getElementById("aadhaar").value;
      const account = document.getElementById("account").value;
      const bank = document.getElementById("bank").value;

      try {
        const response = await fetch("http://localhost:5000/check-dbt-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, aadhaar, account, bank }),
        });

        const data = await response.json();
        document.getElementById("result").innerText = data.message;
      } catch (error) {
        document.getElementById("result").innerText = "⚠️ Error connecting to server.";
        console.error(error);
      }
    }
  </script>
</head>
<body>
  <h1>DBT Status Checker</h1>
  <form onsubmit="checkDBTStatus(event)">
    <label>Name: <input type="text" id="name" required></label><br><br>
    <label>Aadhaar: <input type="text" id="aadhaar" required></label><br><br>
    <label>Account: <input type="text" id="account" required></label><br><br>
    <label>Bank: <input type="text" id="bank"></label><br><br>
    <button type="submit">Check Status</button>
  </form>

  <p id="result"></p>
</body>
</html>
=======
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>DBT Checker</title>
  <script>
    async function checkDBTStatus(event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const aadhaar = document.getElementById("aadhaar").value;
      const account = document.getElementById("account").value;
      const bank = document.getElementById("bank").value;

      try {
        const response = await fetch("http://localhost:5000/check-dbt-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, aadhaar, account, bank }),
        });

        const data = await response.json();
        document.getElementById("result").innerText = data.message;
      } catch (error) {
        document.getElementById("result").innerText = "⚠️ Error connecting to server.";
        console.error(error);
      }
    }
  </script>
</head>
<body>
  <h1>DBT Status Checker</h1>
  <form onsubmit="checkDBTStatus(event)">
    <label>Name: <input type="text" id="name" required></label><br><br>
    <label>Aadhaar: <input type="text" id="aadhaar" required></label><br><br>
    <label>Account: <input type="text" id="account" required></label><br><br>
    <label>Bank: <input type="text" id="bank"></label><br><br>
    <button type="submit">Check Status</button>
  </form>

  <p id="result"></p>
</body>
</html>
>>>>>>> friend/main
