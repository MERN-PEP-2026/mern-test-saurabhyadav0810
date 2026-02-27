import http from "http";
import app from "./app.js";

const PORT = 3000;
const server = http.createServer(app);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
