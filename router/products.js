import { Router } from "express";
import {
  getProduct,
  saveProduct,
  modifyProduct,
  deleteProduct,
} from "../controllers/products.js";

const routerProducts = new Router();

routerProducts.get("/", getProduct);
routerProducts.get("/:id", getProduct);
routerProducts.post("/", saveProduct);
routerProducts.put("/:id", modifyProduct);
routerProducts.delete("/:id", deleteProduct);

export default routerProducts;
