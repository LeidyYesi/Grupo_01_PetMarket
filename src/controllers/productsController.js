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
const Cart = db.Cart;
const CartItem = db.CartItem;

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

        productoNuevo = {
          ...req.body,
          img: req.file ? req.file.filename : "default-image.png",
          // Verificar si el campo discount está vacío y asignar un valor predeterminado
          discount: req.body.discount ? parseInt(req.body.discount) : 0,
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
        // Verificar si el campo discount está vacío y asignar un valor predeterminado
        discount: req.body.discount ? parseInt(req.body.discount) : 0,
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
      } else {
        // Si no se ha cargado una nueva imagen, mantener la imagen anterior.
        productoEditado.img = productoAnterior.img;
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
      await ProductColor.destroy({ where: { product_id: id } });
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

  // Método para agregar productos al carrito de compras
  addToCart: async (req, res) => {
    try {
      const userId = req.session.userLogueado.id; // Se toma el ID del usuario que se almacena en la sesión
      const productId = req.params.id;
      const quantity = parseInt(req.body.quantity) || 1;

      // Buscar el carrito del usuario
      let cart = await Cart.findOne({ where: { user_id: userId } });

      // Si el usuario no tiene carrito, crear uno nuevo
      if (!cart) {
        cart = await Cart.create({ user_id: userId });
      }

      // Buscar si el producto ya está en el carrito
      let cartItem = await CartItem.findOne({
        where: { cart_id: cart.id, product_id: productId },
      });

      // Si el producto ya está en el carrito, actualizar la cantidad
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        // Si el producto no está en el carrito, agregarlo
        await CartItem.create({
          cart_id: cart.id,
          product_id: productId,
          quantity,
        });
      }

      res.redirect("/products/cart");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al agregar producto al carrito");
    }
  },

  // Método para eliminar productos del carrito de compras
  removeFromCart: async (req, res) => {
    try {
      const userId = req.session.userLogueado.id; // Se toma el ID del usuario que se almacena en la sesión
      const productId = req.params.id;

      // Buscar el carrito del usuario
      const cart = await Cart.findOne({ where: { user_id: userId } });

      if (cart) {
        // Eliminar el producto del carrito
        await CartItem.destroy({
          where: { cart_id: cart.id, product_id: productId },
        });
      }

      res.redirect("/products/cart");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al eliminar producto del carrito");
    }
  },

  // Método para mostrar el carrito de compras
  showCart: async (req, res) => {
    try {
      const userId = req.session.userLogueado.id; // Se toma el ID del usuario que se almacena en la sesión

      // Buscar el carrito del usuario y los productos asociados
      const cart = await Cart.findOne({
        where: { user_id: userId },
        include: [
          {
            model: CartItem,
            as: "cart_items",
            include: [
              {
                model: Product,
                as: "product",
                include: [
                  { model: Category, as: "categories" },
                  { model: Pet, as: "pets" },
                  { model: Size, as: "sizes" },
                  { model: Weight, as: "weights" },
                  {
                    model: Color,
                    as: "colors",
                    through: { attributes: [] }, // Agrega esta línea para excluir los atributos de la tabla intermedia (ProductColor) en la respuesta
                  },
                ],
              },
            ],
          },
        ],
      });

      // Si no se encuentra el carrito, renderizar una vista vacía del carrito
      if (!cart) {
        res.render("products/productCart", { cart: null });
      } else {
        // Calcular el total del carrito
        const total = cart.cart_items.reduce((acc, cartItem) => {
          return acc + cartItem.product.price * cartItem.quantity;
        }, 0);

        console.log(
          "---------------Informacion Carrito de Compras---------------"
        );
        console.log(cart);

        // Renderizar la vista del carrito con los productos y el total
        res.render("products/productCart", { cart, total });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al mostrar el carrito de compras");
    }
  },
};

module.exports = productsController;
