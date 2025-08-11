import { faker } from "@faker-js/faker";
import db from "../databases/database";
import { ProductDTO } from "../models/product.dto";
import { ResultBuilder } from "../utils/result";
import { PaginationDTO } from "../models/pagination.dto";

export class ProductService {
  public async findAllProducts({
    limit,
    page,
    offset,
  }: {
    limit: number;
    page: number;
    offset: number;
  }) {
    try {
      const products = await db
        .selectFrom("products")
        .selectAll()
        .limit(limit)
        .offset(offset)
        .execute();

      const paginationDTO = {
        page: page,
        limit: limit,
      } as PaginationDTO;

      if (!products || products.length === 0) {
        return ResultBuilder.success({
          statusCode: 200,
          message: "Tidak ada produk ditemukan",
          pagination: paginationDTO,
          data: [],
        });
      }

      const productDTOs = products.map(
        (product) =>
          ({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
          } as ProductDTO)
      );

      return ResultBuilder.success({
        statusCode: 200,
        message: "Berhasil mendapatkan semua produk",
        pagination: paginationDTO,
        data: productDTOs,
      });
    } catch (error) {
      console.error("Error finding all products:", error);
      return ResultBuilder.internalServerError();
    }
  }

  public async seedProducts(count: number) {
    try {
      const products: Omit<ProductDTO, "id">[] = [];

      for (let i = 0; i < count; i++) {
        products.push({
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price()),
          stock: faker.number.int({ min: 0, max: 100 }),
          created_at: new Date(),
        });
      }

      await db.insertInto("products").values(products).execute();

      return ResultBuilder.success({
        statusCode: 200,
        message: `Berhasil menambahkan ${count} produk`,
      });
    } catch (error) {
      console.error("Error seeding products:", error);
      return ResultBuilder.internalServerError();
    }
  }
}
