const express = require("express");
const productosRouter = express.Router();

const Contenedor = require("../../Contenedor");
const isAdmin = require("../middlewares/isAdmin");
const miContenedor = new Contenedor("./data/productos.json");

productosRouter.get("/", async (req, res) => {
  const listaDeProductos = await miContenedor.getAll();
  res.send({ data: listaDeProductos });
});

productosRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const itemById = await miContenedor.getById(id);
  itemById
    ? res.send({ item: itemById })
    : res.send({ error: "producto no encontrado" });
});

productosRouter.post("/", isAdmin, async (req, res) => {
  const productoNuevo = await miContenedor.save(req.body);
  res.send({
    ...req.body,
  });
});

productosRouter.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const itemActualizado = {
    title,
    price,
    thumbnail,
    id,
  };
  const listaDeProductos = await miContenedor.updateItem(itemActualizado);
  res.send({ message: "Item actualizado" });
});

productosRouter.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const productoEliminado = await miContenedor.deleteById(id);
  res.send({ message: productoEliminado });
});

module.exports = productosRouter;
