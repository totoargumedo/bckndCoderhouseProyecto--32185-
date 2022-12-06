import Product from "../containers/products.js";

const productos = new Product("productos", true); // El segundo argumento sirve para indicar si creara un nuevo archivo en caso de no encontrar el archivo indicado

async function getProduct({ params }, res) {
  let findProduct;
  if (params.id) {
    findProduct = await productos.getById(params.id);
  } else {
    findProduct = await productos.getAll();
  }
  res.status(200).json(findProduct);
}

async function saveProduct({ body }, res) {
  const savedProduct = await productos.save(body);
  res.status(201).json(savedProduct);
}

async function modifyProduct({ body, params: { id } }, res) {
  const modifiedProduct = await productos.modifyById(id, body);
  res.status(201).json(modifiedProduct);
}

async function deleteProduct({ params }, res) {
  const deletedProduct = await productos.deleteById(params.id);
  res.status(201).json(deletedProduct);
}

export { productos, getProduct, saveProduct, modifyProduct, deleteProduct };
