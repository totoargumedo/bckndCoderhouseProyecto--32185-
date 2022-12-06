import { Router } from "express";
import {
  getProduct,
  saveProduct,
  modifyProduct,
  deleteProduct,
} from "../controllers/products.js";
import loginCheck from "../controllers/login.js";

const routerProducts = new Router();

routerProducts.get("/", getProduct);
routerProducts.get("/:id", getProduct);
routerProducts.post("/", loginCheck, saveProduct);
routerProducts.put("/:id", loginCheck, modifyProduct);
routerProducts.delete("/:id", loginCheck, deleteProduct);

export default routerProducts;
