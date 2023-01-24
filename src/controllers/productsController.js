const path = require('path');
const fs = require('fs');
const model = require('../models/jsonTableFunctions');
const product = model('productsDataBase');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
  // (get) Root - Mostrar todos los productos
  index: (req, res) => {
    // (get) Root - Mostrar todos los productos
    index: (req, res) => {

      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  
      res.render("products/productList", {productos: products})
    }

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
    console.log(req.body);
    let productoNuevo = {
			...req.body
    }

    let destinationPath = './public/img/' + req.body.size + '/' + req.body.Mascota;
    console.log("destinationPath",destinationPath);
    //moveFile(req.file.filename, req.file.destination,destinationPath);
    

		let productCreated = product.create(productoNuevo);


    
		


    res.redirect("/products");
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
    product.delete(id);
    res.redirect("/products");
  },
  cart: (req, res) => {
    res.render("products/productCart");
  },

};



module.exports = productsController;