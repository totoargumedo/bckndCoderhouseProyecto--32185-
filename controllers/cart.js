import Cart from "../containers/cart.js";
import { productos } from "./products.js";

const carritos = new Cart("carritos", true); // El segundo argumento sirve para indicar si creara un nuevo archivo en caso de no encontrar el archivo indicado

async function getAllCarts(req, res) {
  const carts = await carritos.getAll();
  res.status(200).json(carts);
}

async function createCart(req, res) {
  const newCart = await carritos.create();
  res.status(201).json(newCart);
}

async function addProductToCart(req, res) {
  const product = await productos.getById(req.query.idProduct);
  const cart = await carritos.addProduct(req.params.idCart, product);
  res.status(201).json(cart);
}

async function getCartProducts({ params: { idCart } }, res) {
  const cartProducts = await carritos.getById(idCart);
  res.status(200).json(cartProducts);
}

async function deleteCart({ params: { idCart } }, res) {
  const cartDeleted = await carritos.deleteCartById(idCart);
  res.status(200).json(cartDeleted);
}

async function deleteProductFromCart(req, res) {
  const updatedCart = await carritos.deleteProductInCartById(
    req.params.idCart,
    req.query.idProduct
  );
  res.status(201).json(updatedCart);
}

export {
  getAllCarts,
  createCart,
  addProductToCart,
  getCartProducts,
  deleteProductFromCart,
  deleteCart,
};
