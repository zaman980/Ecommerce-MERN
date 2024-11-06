const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} = require("../Controllers/UserController");

const { authenticate, authorizeAdmin } = require("../Middlewares/AuthMiddleware");
const validateUser = require("../Middlewares/UserValidation");

// Public routes
router.post("/", validateUser, createUser);  // Route for user registration with validation
router.post("/auth", loginUser);      // Route for user login
router.post("/logout", logoutCurrentUser); // Route for user logout

router.get("/profile/:id", authenticate, getCurrentUserProfile);  // Get authenticated user's profile
router.put("/profile/:id", authenticate, updateCurrentUserProfile);  // Update profile
// Admin routes
router.delete("/:id", authenticate, authorizeAdmin, deleteUserById);  // Admin deletes user
router.get("/:id", authenticate, authorizeAdmin, getUserById);  // Admin fetches user by ID
router.put("/:id", authenticate, authorizeAdmin, updateUserById);  // Admin updates user by ID

// Admin route to get all users
router.get("/", authenticate, authorizeAdmin, getAllUsers);

module.exports = router;
