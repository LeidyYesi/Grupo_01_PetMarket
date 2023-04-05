const path = require("path");
const fs = require("fs");
const model = require("../models/jsonTableFunctions");
const product = model("productsDataBase");
const moveFile = require("../models/imageDistribution");
const db = require("../database/models/");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const Product = db.Product;
const Category = db.Category;
const Pet = db.Pet;
const Size = db.Size;
const Weight = db.Weight;
const Color = db.Color;
const ProductColor = db.ProductColor;

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
      if (filtro == "perros") {
        filtro_consulta_mascota = 1;
      } else {
        filtro_consulta_mascota = 2;
      }

      whereClause = { pets_id: filtro_consulta_mascota };
      titulo = "Productos para " + filtro;
    } else {
      if (filtro == "accesorios") {
        filtro_consulta_categoria = 1;
      } else if (filtro == "juguetes") {
        filtro_consulta_categoria = 2;
      } else if (filtro == "alimentos") {
        filtro_consulta_categoria = 3;
      } else {
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
        { model: Color, as: "colors" },
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
    Product.findByPk(id, {
      include: [
        { model: db.Category, as: "categories" },
        { model: db.Pet, as: "pets" },
        { model: db.Size, as: "sizes" },
        { model: db.Weight, as: "weights" },
        { model: Color, as: "colors" },
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
    let resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.redirect("/products/create");
    } else {
      try {
        let productoNuevo = {
          ...req.body,
          img: req.file ? req.file.filename : "default-image.png",
        };

        console.log("---------------Producto Nuevo---------------");
        console.log(productoNuevo);

        if (req.file) {
          if (req.body.categories_id == "1") {
            categoria_img = "accesorios";
          } else if (req.body.categories_id == "2") {
            categoria_img = "juguetes";
          } else if (req.body.categories_id == "3") {
            categoria_img = "alimentos";
          } else {
            categoria_img = "aseo";
          }

          if (req.body.pets_id == "1") {
            mascota_img = "perros";
          } else {
            mascota_img = "gatos";
          }

          let destinationPath =
            "./public/img/" + categoria_img + "/" + mascota_img;
          console.log("destinationPath", destinationPath);
          moveFile(req.file.filename, req.file.destination, destinationPath);
        }

        // Crear un nuevo producto en la base de datos
        Product.create(productoNuevo).then((producto) => {
          const product_id = producto.id;
          const color_id = req.body.color_id;

          let productoColorNuevo = {
            product_id,
            color_id,
          };

          console.log(
            "El productoColorNuevo es: " + JSON.stringify(productoColorNuevo)
          );

          // Crear un nuevo registro en la tabla ProductColor
          ProductColor.create(productoColorNuevo)
            .then(() => {
              res.redirect("/");
            })
            .catch((error) => {
              console.log(error);
              res
                .status(500)
                .send("Error al crear el registro en ProductColor");
            });
        });
      } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear el producto");
      }
    }
  },

  // (get) Update - Formulario para editar
  edit: async (req, res) => {
    let id = req.params.id;

    let productoFiltrado = await Product.findByPk(id, {
      include: [
        { model: db.Category, as: "categories" },
        { model: db.Pet, as: "pets" },
        { model: db.Size, as: "sizes" },
        { model: db.Weight, as: "weights" },
        { model: Color, as: "colors" },
      ],
    });

    console.log("---------------Producto Filtrado---------------");
    console.log(productoFiltrado);

    res.render("products/productEdit", { producto: productoFiltrado });
  },

  // (put) Update - Método para actualizar la info
  processEdit: async (req, res) => {
    let resultValidation = validationResult(req);
    let id = req.params.id;

    if (resultValidation.errors.length > 0) {
      res.redirect("/products/edit/" + id);
    } else {

      let productoAnterior = await Product.findByPk(id, {
        include: [
          { model: db.Category, as: "categories" },
          { model: db.Pet, as: "pets" },
          { model: db.Size, as: "sizes" },
          { model: db.Weight, as: "weights" },
          { model: Color, as: "colors" },
        ],
      });

      let productoEditado = {
        id: productoAnterior.id,
        ...req.body,
        img: req.file ? req.file.filename : productoAnterior.img,
      };

      console.log("---------------Producto Editado---------------");
      console.log(productoEditado);

      if (req.file) {
        if (req.body.categories_id == "1") {
          categoria_img = "accesorios";
        } else if (req.body.categories_id == "2") {
          categoria_img = "juguetes";
        } else if (req.body.categories_id == "3") {
          categoria_img = "alimentos";
        } else {
          categoria_img = "aseo";
        }

        if (req.body.pets_id == "1") {
          mascota_img = "perros";
        } else {
          mascota_img = "gatos";
        }

        let destinationPath =
          "./public/img/" + categoria_img + "/" + mascota_img;
        console.log("destinationPath", destinationPath);
        moveFile(req.file.filename, req.file.destination, destinationPath);
      }

      // Actualizar el producto en la base de datos
      Product.update(productoEditado, { where: { id } })
        .then(async () => {
          const newColorId = req.body.color_id;
          const oldColorId = productoAnterior.colors[0].ProductColor.color_id;

          // Si el color ha cambiado, actualizamos la tabla ProductColor
          if (newColorId !== oldColorId) {
            await ProductColor.update(
              { color_id: newColorId },
              { where: { product_id: id } }
            );
          }
          res.redirect("/");
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Error al actualizar el producto");
        });
    }
  },

  // (delete) Delete - Eliminar un producto de la DB
  destroy: async (req, res) => {
    try {
      let id = req.params.id;
      await Product.destroy({ where: { id } });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error eliminando producto");
    }
  },

  // Metodo para buscar productos por descripcion
  search: (req, res) => {
    let busqueda = req.query.search;

    console.log("---------------Palabra de Busqueda---------------");
    console.log(busqueda);

    let titulo = "Productos con la palabra: " + busqueda;

    let productos = db.Product.findAll({
      where: {
        description: { [Op.like]: "%" + busqueda + "%" },
      },
      include: [
        { model: db.Category, as: "categories" },
        { model: db.Pet, as: "pets" },
        { model: db.Size, as: "sizes" },
        { model: db.Weight, as: "weights" },
        { model: Color, as: "colors" },
      ],
    })
      .then((productos) => {
        titulo = titulo.toUpperCase();
        res.render("products/productList", { productos, titulo });
      })
      .catch((error) => console.log(error));
  },

  // Metodo para adicionar informacion al carrito de compras
  cart: (req, res) => {
    res.render("products/productCart");
  },
};

module.exports = productsController;
