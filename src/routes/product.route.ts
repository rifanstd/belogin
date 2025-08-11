import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductController } from "../controllers/product.controller";

const productRouter: Router = Router();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const productController: ProductController = new ProductController();

productRouter.get(
  "/products",
  authMiddleware.authenticate,
  productController.getProducts.bind(productController)
);

productRouter.post(
  "/products/seed",
  authMiddleware.authenticate,
  productController.seedProducts.bind(productController)
);

export default productRouter;
