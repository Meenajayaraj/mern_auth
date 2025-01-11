const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../model/userModel");

// This middleware will protect routes that require authentication
exports.protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to continue", 401)
    );
  }

  // 2. Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if the user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401)
      );
    }

    req.user = currentUser; // Attach the current user to the request object
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};
