import { Router } from "express";
import {
  getAllCarts,
  createCart,
  addProductToCart,
  getCartProducts,
  deleteProductFromCart,
  deleteCart,
} from "../controllers/cart.js";

const routerCart = new Router();

routerCart.post("/", createCart);
routerCart.get("/", getAllCarts);
routerCart.delete("/:idCart/products/:idProduct", deleteProductFromCart);
routerCart.delete("/:idCart", deleteCart);
routerCart.post("/:idCart/products", addProductToCart);
routerCart.get("/:idCart/products", getCartProducts);

export default routerCart;
