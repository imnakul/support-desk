const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

//connect to databsae
connectDB();

const app = express();

//below two lines are some middleware which are needed to use body in request in express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
   res.status(200).json({ message: "Welcome to the support desk Api" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
