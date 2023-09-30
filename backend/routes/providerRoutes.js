import express from "express";
const router = express.Router();

import {
  addNewProduct,
  getAllProviders,
  getProductsByProviderId,
  getProviderById,
  getProviderRegisters,
  registerProvider,
  updateProvider,
  dontAcceptProvider,
} from "../controllers/providerController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllProviders).post(registerProvider);
router.route("/register").get(getProviderRegisters);
router.route("/register/:id").delete(protect, admin, dontAcceptProvider);
router.route("/:id").get(getProviderById).put(protect, admin, updateProvider);
router.route("/:id/all_products").get(getProductsByProviderId);
router.route("/add_new_product").post(addNewProduct);
export default router;
