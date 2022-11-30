import fs from "fs";
import crypto from "crypto";

class Product {
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

  async save(product) {
    const newProduct = { id: crypto.randomUUID(), ...product };
    this.#data.push(newProduct);
    await this.write();
    return newProduct;
  }

  getAll() {
    if (this.#data.length <= 0) {
      return { error: `No se encontraron elementos` };
    }
    return this.#data;
  }

  getById(id) {
    const product = this.#data.find((product) => product.id == id);
    if (!product) {
      return { error: `Producto con id:${id} no encontrado` };
    }
    return product;
  }

  async modifyById(id, product) {
    let index = this.#data.indexOf(
      this.#data.find((product) => product.id == id)
    );
    if (index == -1) {
      return { error: `Error: producto ${id} no encontrado` };
    }
    const modifiedProduct = product;
    this.#data[index] = modifiedProduct;
    await this.write();
    return modifiedProduct;
  }

  async deleteById(id) {
    const index = this.#data.indexOf(
      this.#data.find((element) => element.id == id)
    );
    if (index == -1) {
      return { error: `Error: elemento ${id} no encontrado` };
    }
    const deletedProduct = this.#data[index];
    this.#data.splice(index, 1);
    await this.write();
    return deletedProduct;
  }

  async deleteAll() {
    this.#data = [];
    await this.write();
    return { message: "Todos los elementos fueron borrados correctamente" };
  }
}

export default Product;
