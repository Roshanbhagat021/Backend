const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Ready to use!");
});

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
