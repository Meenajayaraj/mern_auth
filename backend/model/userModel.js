const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      trim: true,
      minlength: 3,
      maxlength: 30,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false, // Hide password in queries by default
    },
    passwordconfirm: {
      type: String,
      required: [true, "Please confirm the password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    resetPasswordOTP: {
      type: String,
      default: null,
    },
    resetPasswordOTPExpires: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password and remove the password confirmation field
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 12);

  // Remove the passwordconfirm field after validation
  this.passwordconfirm = undefined;

  next();
});

// Method to check if the provided password matches the hashed password
userSchema.methods.correctPassword = async function (password, userPassword) {
  if (!password || !userPassword) return false;
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
