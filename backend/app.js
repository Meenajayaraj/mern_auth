const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError"); // Import AppError correctly
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://capstone-frontendpro.netlify.app",
    ],
    credentials: true, // ✅ Allow cookies & authentication tokens
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Ensure correct methods are allowed
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Users API URLs
app.use("/api/v1/users", userRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
