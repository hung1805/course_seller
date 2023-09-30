import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getLessonsByProductId,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(updateProduct);
router.route("/:id/lessons").get(protect, getLessonsByProductId);

export default router;
