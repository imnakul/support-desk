const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
   res.status(200).json({ message: "Welcome to the support desk Api" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
