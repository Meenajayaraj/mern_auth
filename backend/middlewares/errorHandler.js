// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging

  // Send detailed error in development mode
  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      message: "Internal Server Error",
      stack: err.stack, 
    });
  }

  // Generic error message for production
  return res.status(500).json({
    message: "Internal Server Error",
  });
};
