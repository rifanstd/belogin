import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async getProducts(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({
        message: "Invalid limit parameter. Gunakan bilangan positive.",
      });
    }

    if (limit > 50) {
      return res.status(400).json({
        message: "Limit tidak boleh lebih dari 50.",
      });
    }

    const offset = (page - 1) * limit;

    const result = await this.productService.findAllProducts({
      limit,
      page,
      offset,
    });
    return res.status(result.statusCode).json(result);
  }

  public async seedProducts(req: Request, res: Response) {
    if (req.body.count) {
      const rawCount = Number(req.body.count);
      if (isNaN(rawCount)) {
        return res.status(400).json({
          message: "Invalid count parameter. Gunakan bilangan positive.",
        });
      }
      const result = await this.productService.seedProducts(rawCount);
      return res.status(result.statusCode).json(result);
    }
    const result = await this.productService.seedProducts(100);
    return res.status(result.statusCode).json(result);
  }
}
