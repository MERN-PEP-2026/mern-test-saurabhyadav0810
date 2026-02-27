
import express from "express";
import http from "http";
const PORT = 5000;
const app = express();

const server = http.createServer(app);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
