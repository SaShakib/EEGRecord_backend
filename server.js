const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import CORS

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Endpoint to save data
app.post("/save-session", (req, res) => {
  const { name, random, title, session, step, data } = req.body;

  // Filename format
  const filename = `${name}_${random}_${title}_s${session}.json`;
  const filePath = path.join(__dirname, "Training", filename);

  // Ensure Training directory exists
  fs.mkdirSync(path.join(__dirname, "Training"), { recursive: true });

  // Write data to JSON file
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error saving file:", err);
      res.status(500).send("Failed to save file.");
    } else {
      console.log(`Data saved as ${filename}`);
      res.status(200).send(`Data saved as ${filename}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
