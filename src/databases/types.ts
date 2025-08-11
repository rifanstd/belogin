import { Generated } from "kysely";

export interface Database {
  users: UserTable;
  products: ProductTable;
}

export interface UserTable {
  id: Generated<number>;
  name: string;
  email: string;
  password: string;
}

export interface ProductTable {
  id: Generated<number>;
  name: string;
  price: number;
  stock: number;
  created_at: Date;
}
