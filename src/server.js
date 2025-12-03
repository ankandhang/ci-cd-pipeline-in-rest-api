// src/server.js
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Basic API route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Export app for tests
module.exports = app;

// Start server only if NOT in test mode
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
