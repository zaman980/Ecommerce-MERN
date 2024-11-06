const express =require( "express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} = require( "../Controllers/CategoryController");

const { authenticate, authorizeAdmin } = require( "../Middlewares/AuthMiddleware");

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

module.exports= router;