import express from "express";
import routerCart from "./router/cart.js";
import routerProducts from "./router/products.js";

// server
const app = express();
const PORT = 8080 || process.env.PORT;

// middles
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routers
app.use("/api/products", routerProducts);
app.use("/api/shoppingcart", routerCart);

// endpoints
app.get("*", (req, res) => {
  res.status(418).json({
    error: -2,
    description: `${req.path} not implemented`,
    method: req.method,
  });
});

// inicializacion server
const server = app.listen(PORT, () =>
  console.log(`Servidor iniciado en puerto: ${server.address().port}`)
);

server.on("error", (error) => console.log(`Error en server: ${error}`));
