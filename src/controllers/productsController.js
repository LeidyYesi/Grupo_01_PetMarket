const path = require("path");
const fs = require("fs");
const model = require("../models/jsonTableFunctions");
const product = model("productsDataBase");
const moveFile = require("../models/imageDistribution");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsController = {
  // (get) List - Mostrar todos los productos
  index: (req, res) => {
    let filtro = req.params.filtro;
    let products = product.findAll();

    let productosFiltrados = products.filter((producto) => {
      if(filtro == "perros" || filtro == "gatos") {
        return producto.pet == filtro;
      } else {
      return producto.category == filtro;
      }
    });

    res.render("products/productList", { productos: productosFiltrados });
  },

  categoryList: (req, res) => {
    let category = req.params.category;

    let products = product.findAll();

    let productosCategoria = products.filter((producto) => {
      return producto.category == category;
    });

    res.render("products/productList", { productos: productosCategoria });
  },

  // (get) Detail - Detalle de un producto
  detail: (req, res) => {
    let id = req.params.id;
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    let productoFiltrado = products.find((producto) => {
      return producto.id == id;
    });

    res.render("products/productDetail", { producto: productoFiltrado });
  },

  // (get) Create - Formulario para crear
  create: (req, res) => {
    res.render("products/productCreate");
  },

  // (post) Create - Método para guardar la info
  processCreate: (req, res) => {
    console.log(req.body);
    let productoNuevo = {
      ...req.body,
      image: req.file ? req.file.filename : "default-image.png"
    };


    if(req.file) {
      let destinationPath =
      "./public/img/" + req.body.category + "/" + req.body.pet;
      console.log("destinationPath", destinationPath);
      moveFile(req.file.filename, req.file.destination, destinationPath)  
    }

    let productCreated = product.create(productoNuevo);

    res.redirect("/");
  },

  // (get) Update - Formulario para editar
	edit: (req, res) => {
    let id = req.params.id;
   
    let productoFiltrado = product.findByPk(id);
		// let productoFiltrado = products.find(producto => {
		// 	return producto.id == id
		// })
		res.render("products/productEdit", {producto: productoFiltrado})
	},

  // (put) Update - Método para actualizar la info
  processEdit: (req, res) => {
    // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    let id = req.params.id;
		// let productoAnterior = products.find(producto => {
		// 	return producto.id == id
		// })
    let productoAnterior = product.findByPk(id);

    // let productoEditado = {
    //   /* dejar el id anterior */
    //   id: productoAnterior.id,
    //   name: req.body.name,
    //   description: req.body.description,
    //   category: req.body.category,
    //   pet: req.body.pet,
    //   color: req.body.color,
    //   weight: req.body.weight,
    //   size: req.body.size,
    //   price: req.body.price,
    //   discount: req.body.discount,
    //   image: req.file ? req.file.filename : productoAnterior.image,
    // };

    let productoEditado = {
      id: productoAnterior.id,
      ...req.body,
      image: req.file ? req.file.filename : productoAnterior.image
    };

    console.log(productoEditado);
    /* Modificar el array en la posición correspondiente */

    if(req.file) {
      let destinationPath =
      "./public/img/" + req.body.category + "/" + req.body.pet;
      console.log("destinationPath", destinationPath);
      moveFile(req.file.filename, req.file.destination, destinationPath)  
    }

		let indice = product.update(productoEditado)
		console.log(indice);

    res.redirect("/");
  },
 
  // (delete) Delete - Eliminar un producto de la DB
  destroy: (req, res) => {
    let id = req.params.id;
    product.delete(id);
    res.redirect("/");
  },

  // Metodo para adicionar informacion al carrito de compras
  cart: (req, res) => {
    res.render("products/productCart");
  },
};

module.exports = productsController;
