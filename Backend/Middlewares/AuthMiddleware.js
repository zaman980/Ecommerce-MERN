const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

const authenticate = asyncHandler(async (req, res, next) => {
  console.log("Headers:", req.headers); // Check headers for token

  // Get token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  console.log("Token:", token); // Log the token

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the decoded token
    console.log("User ID",decoded.userId);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the user to the request
    console.log("Authenticated User:", req.user); // Debugging

    next();
  } catch (error) {
    console.error("Token Verification Failed:", error);
    res.status(401).json({ message: "Not authorized, token failed." });
  }
});

const authorizeAdmin = (req, res, next) => {
  console.log("User in authorizeAdmin:", req.user); // Log user object

  if (req.user && req.user.isAdmin) {
    console.log("User is an Admin"); // Admin check passed
    next();
  } else {
    console.log("User is not authorized as admin"); // Failed admin check
    res.status(401).json({ message: "Not authorized as an admin." });
  }
};

module.exports = { authenticate, authorizeAdmin };
