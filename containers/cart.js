import fs from "fs";
import crypto from "crypto";

class Cart {
  #data;
  #fileName;
  #newFile;

  constructor(fileName, newFile) {
    this.#fileName = `./db/${fileName}.json`;
    this.#newFile = newFile;
    this.#data = [];
    this.read();
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.#fileName, "utf-8");
      this.#data = JSON.parse(data);
      console.log({
        message: `Archivo ${this.#fileName} cargado correctamente`,
      });
    } catch (error) {
      if (this.#newFile) {
        console.warn(error);
        await this.write();
      } else {
        console.warn(error);
      }
    }
  }

  async write() {
    try {
      await fs.promises.writeFile(this.#fileName, JSON.stringify(this.#data));
      console.log({
        message: `El archivo ${this.#fileName} se actualizo`,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  async create() {
    const newCart = { id: crypto.randomUUID(), products: [] };
    this.#data.push(newCart);
    await this.write();
    return newCart;
  }

  async addProduct(cartId, product) {
    const index = this.#data.indexOf(
      this.#data.find((cart) => cart.id == cartId)
    );
    this.#data[index].products.push(product);
    await this.write();
    return this.#data[index];
  }

  getAll() {
    if (this.#data.length <= 0) {
      return { error: `No se encontraron elementos` };
    }
    return this.#data;
  }

  getById(id) {
    const cart = this.#data.find((cart) => cart.id == id);
    if (!cart) {
      return { error: `Carrito con id:${id} no encontrado` };
    }
    return cart.products;
  }

  async deleteCartById(id) {
    const index = this.#data.indexOf(this.#data.find((cart) => cart.id == id));
    if (index == -1) {
      return { error: `Error: carrito ${id} no encontrado` };
    }
    const deletedCart = this.#data[index];
    this.#data[index].products = [];
    await this.write();
    return deletedCart;
  }

  async deleteProductInCartById(cartId, productId) {
    const indexCart = this.#data.indexOf(
      this.#data.find((cart) => cart.id == cartId)
    );
    if (indexCart == -1) {
      return { error: `Error: carrito ${id} no encontrado` };
    }
    const productsInCart = this.#data[indexCart].products.filter(
      (product) => product.id == productId
    ).lenght;
    if (productsInCart <= 0) {
      return {
        error: `Error: producto con id:${id} no encontrado en el carrito`,
      };
    }
    this.#data[indexCart].products = this.#data[indexCart].products.filter(
      (product) => product.id != productId
    );
    const updatedCart = this.#data[indexCart];
    await this.write();
    return updatedCart;
  }
}

export default Cart;
