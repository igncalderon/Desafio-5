const Contenedor = require("./Contenedor");

const miContenedor = new Contenedor("productos.json");

const Producto = {
  title: "Calculadora",
  price: 400,
  thumbnail: "foto2.png",
};

// ;
// miContenedor.getById(6);
// miContenedor.getAll()
// miContenedor.deleteById(3)
// miContenedor.deleteAll()

const test = async () => {
  const retornado = await miContenedor.save(Producto);
  console.log(retornado);
};
test();
