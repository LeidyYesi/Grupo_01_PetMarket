const path = require('path');
const fs = require('fs');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
  // (get) Root - Mostrar todos los productos
  index: (req, res) => {
    res.render("products/product");
  },

  // (get) Detail - Detalle de un producto
  detail: (req, res) => {
    res.render("products/productDetail");
  },

  // (get) Create - Formulario para crear
  create: (req, res) => {
    res.render("products/productCreate");
  },

  // (post) Create - Método para guardar la info
  processCreate: (req, res) => {
    res.send(req.body);
  },

  // (get) Update - Formulario para editar
  edit: (req, res) => {
    res.render("products/productEdit");
  },
  // (put) Update - Método para actualizar la info
  // processEdit: (req, res) => {

  // },

  // (delete) Delete - Eliminar un producto de la DB
  destroy: (req, res) => {
    let id = req.params.id;
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    let productosFiltrados = products.filter((producto) => {
      return producto.id != id;
    });

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(productosFiltrados, null, " ")
    );

    res.redirect("/products");
  },
  cart: (req, res) => {
    res.render("products/productCart");
  },

};



module.exports = productsController;