const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { dispatchCalls } = require("./backend/dispatcher");

app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());

app.post("/api/dispatch", async (req, res) => {
  const result = await dispatchCalls(req.body);
  res.json(result);
});

app.use((req, res) => {
  res.status(404);
  res.send(`<h1>Error 404: Resource not found</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
