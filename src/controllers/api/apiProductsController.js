const db = require("../../database/models/");
const Product = db.Product;
const Category = db.Category;
const Pet = db.Pet;
const Size = db.Size;
const Weight = db.Weight;
const Color = db.Color;
const ProductColor = db.ProductColor;

const productsController = {
  list: (req, res) => {
    Product.findAll({
      include: [
        { model: Category, as: "categories" },
        { model: Pet, as: "pets" },
        { model: Size, as: "sizes" },
        { model: Weight, as: "weights" },
        { model: Color, as: "colors" },
      ],
    }).then((productos) => {
      let productosData = [];
      productos.forEach((element) => {
        let productosLiteral = {
          id: element.id,
          name: element.name,
          description: element.description,
          price: element.price,
          discount: element.discount,
          category: element.categories.category,
          pet: element.pets.pet,
          size: element.sizes.size,
          weight: element.weights.weight,
          color: element.colors.color,
          img:
            "/img/" +
            element.categories.category +
            "/" +
            element.pets.pet +
            "/" +
            element.img,
          url: "/api/products/" + element.id,
        };
        productosData.push(productosLiteral);
      });
      let respuesta = {
        meta: {
          status: 200,
          count: productos.length,
          url: "/api/products",
        },
        data: productosData,
      };
      res.json(respuesta);
    });
  },
  detail: (req, res) => {
    let id = req.params.id;

    Product.findByPk(id, {
      include: [
        { model: db.Category, as: "categories" },
        { model: db.Pet, as: "pets" },
        { model: db.Size, as: "sizes" },
        { model: db.Weight, as: "weights" },
        { model: Color, as: "colors" },
      ],
    }).then((producto) => {
      let productoLiteral = {
        id: producto.id,
        name: producto.name,
        description: producto.description,
        price: producto.price,
        discount: producto.discount,
        category: producto.categories.category,
        pet: producto.pets.pet,
        size: producto.sizes.size,
        weight: producto.weights.weight,
        color: producto.colors.color,
        img:
          "/img/" +
          producto.categories.category +
          "/" +
          producto.pets.pet +
          "/" +
          producto.img,
        url: "/api/products/" + producto.id,
      };
      let respuesta = {
        data: productoLiteral,
      };
      res.json(respuesta);
    });
  },
};

module.exports = productsController;
