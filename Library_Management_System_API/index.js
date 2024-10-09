const express = require("express");
const registerAndLoginRoute = require("./register_and_login_routes/register.user");
const connectToDB = require("./config/connect_db");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Ready to use!");
});

// app.use("/api/users",)
app.use("/api/auth",registerAndLoginRoute)


// listening to port 3030
app.listen(port, () => {
    console.log(`server is running on port:${port}`);
    connectToDB()
});
