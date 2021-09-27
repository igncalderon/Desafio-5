const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
  }
  async save(producto) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      let productos = [];
      if (contenido == "") {
        producto.id = 1;
        productos.push(producto);
      } else {
        const listaDeProductos = JSON.parse(contenido);
        producto.id = listaDeProductos.length + 1;
        listaDeProductos.push(producto);
        productos = listaDeProductos;
      }

      const productosString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productosString);
      return producto.id;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const contenidoJSON = await fs.promises.readFile(
        `./${this.file}`,
        "utf-8"
      );
      const contenido = JSON.parse(contenidoJSON);

      const item = contenido.find((item) => item.id == id);
      if (item) {
        return item;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      const contenidoJSON = await fs.promises.readFile(
        `./${this.file}`,
        "utf-8"
      );
      const contenido = JSON.parse(contenidoJSON);
      return contenido;
    } catch (error) {
      return error;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.file}`, "");
    } catch (error) {
      return error;
    }
  }

  async deleteById(idDelete) {
    try {
      const contenidoJSON = await fs.promises.readFile(
        `./${this.file}`,
        "utf-8"
      );
      const contenido = JSON.parse(contenidoJSON);
      const seEncontro = contenido.find((item) => item.id == idDelete);
      if (seEncontro) {
        const nuevaLista = contenido.filter((item) => item.id != idDelete);
        const productosString = JSON.stringify(nuevaLista, null, 2);
        fs.promises.writeFile(`./${this.file}`, productosString);
        return "Elemento eliminado";
      } else {
        return "No existe ese ID";
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = Contenedor;
