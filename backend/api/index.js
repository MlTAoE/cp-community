require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("../routes/authRoutes");
const adminauthRoutes = require("../routes/adminauthRoutes");
const dataRoutes = require("../routes/dataRoutes");
const compression = require('compression');


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['https://cp-vault.vercel.app', 'http://localhost:5173'];


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


// Middleware
app.use(compression());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminauthRoutes);
app.use("/data", dataRoutes);


// Handle unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Server initialization
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;