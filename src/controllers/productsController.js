const path = require("path");
const fs = require("fs");
const model = require("../models/jsonTableFunctions");
const product = model("productsDataBase");
const moveFile = require("../models/imageDistribution");
const db = require("../database/models/");
const Product = db.Product;
const Category = db.Category;
const Pet = db.Pet;
const Size = db.Size;
const Weight = db.Weight;
const Color = db.Color;

/* En la constante "products" ya tienen los productos que están
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsController = {
   // (get) List - Mostrar todos los productos
   index: (req, res) => {
    let filtro = req.params.filtro;
    let whereClause;
    let titulo;

    if (filtro == "perros" || filtro == "gatos") {
      if(filtro == "perros") {
        filtro_consulta_mascota = 1;
      }else{
        filtro_consulta_mascota = 2;
      }

      whereClause = { pets_id: filtro_consulta_mascota };
      titulo = "Productos para " + filtro;

    } else {
      if(filtro == "accesorios") {
        filtro_consulta_categoria = 1;
      }else if(filtro == "juguetes") {
        filtro_consulta_categoria = 2;
      }else if(filtro == "alimentos") {
        filtro_consulta_categoria = 3;
      }else{
        filtro_consulta_categoria = 4;
      }

      whereClause = { categories_id: filtro_consulta_categoria };
      titulo = filtro.replace("aseo", "Cuidado e Higiene");
    }

    Product.findAll({
      where: whereClause,
      include: [
        { model: Category, as: "categories" },
        { model: Pet, as: "pets" },
        { model: Size, as: "sizes" },
        { model: Weight, as: "weights" },
        { model: Color, as: "productsColors" },
      ],
    })
      .then((productos) => {
        titulo = titulo.toUpperCase();
        res.render("products/productList", { productos, titulo });
      })
      .catch((error) => console.log(error));
  },

  // (get) Detail - Detalle de un producto
  detail: (req, res) => {
    let id = req.params.id;
    // Buscar el producto por id en la base de datos
    db.Product.findByPk(id, {
      include: [
      { model: db.Category, as: "categories" },
      { model: db.Pet, as: "pets" },
      { model: db.Size, as: "sizes" },
      { model: db.Weight, as: "weights" },
      { model: db.Color, as: "productsColors" },
    ],
    })
      .then((producto) => {
        console.log(producto);
        res.render("products/productDetail", { producto: producto });
      })
      .catch((error) => console.log(error));

  },

  // (get) Create - Formulario para crear
  create: (req, res) => {
    res.render("products/productCreate");
  },

  // (post) Create - Método para guardar la info
  processCreate: (req, res) => {
    console.log(req.body);
    try {
    let productoNuevo = {
      ...req.body,
      img: req.file ? req.file.filename : "default-image.png",
    };

    console.log("---------------Producto Nuevo---------------");
    console.log(productoNuevo);

    if (req.file) {

      if(req.body.categories_id == "1") {
        categoria_img = "accesorios";
      }else if(req.body.categories_id == "2") {
        categoria_img  = "juguetes";
      }else if(req.body.categories_id == "3") {
        categoria_img  = "alimentos";
      }else{
        categoria_img  = "aseo";
      }

      if(req.body.pets_id == "1") {
        mascota_img = "perros";
        }else{
          mascota_img = "gatos";
        }

      let destinationPath =
        "./public/img/" + categoria_img + "/" +  mascota_img;
      console.log("destinationPath", destinationPath);
      moveFile(req.file.filename, req.file.destination, destinationPath);
    }

     // Crear un nuevo producto en la base de datos
     const productoCreado = Product.create(productoNuevo);

     res.redirect("/");

   } catch (error) {
     console.log(error);
     res.status(500).send("Error al crear el producto");
   }

    res.redirect("/");
  },

  // (get) Update - Formulario para editar
  edit: (req, res) => {
    let id = req.params.id;

    let productoFiltrado = product.findByPk(id);

    res.render("products/productEdit", { producto: productoFiltrado });
  },

  // (put) Update - Método para actualizar la info
  processEdit: (req, res) => {
    let id = req.params.id;

    let productoAnterior = product.findByPk(id);

    let productoEditado = {
      id: productoAnterior.id,
      ...req.body,
      image: req.file ? req.file.filename : productoAnterior.image,
    };

    console.log(productoEditado);
    /* Modificar el array en la posición correspondiente */

    if (req.file) {
      let destinationPath =
        "./public/img/" + req.body.category + "/" + req.body.pet;
      console.log("destinationPath", destinationPath);
      moveFile(req.file.filename, req.file.destination, destinationPath);
    }

    let indice = product.update(productoEditado);
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
