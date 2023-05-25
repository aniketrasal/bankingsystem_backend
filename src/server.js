require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const app = express();
const userRoutes = require('./routes/user.route');
const bankManagerRoutes = require('./routes/banker.route');
const signupController = require("./controllers/auth/signup.controller");
const loginController = require("./controllers/auth/login.controller");
const logoutController = require("./controllers/auth/logout.controller");

// Connect to MongoDB
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Banks Backend");
});

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
});

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Auth api
app.post("/signup", signupController);
app.post("/login", loginController);
app.get("/logout", logoutController);

// Routes
app.use('/user', userRoutes);
app.use('/bankmanager', bankManagerRoutes);
