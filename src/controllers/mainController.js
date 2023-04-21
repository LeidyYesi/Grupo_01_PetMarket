const db = require("../database/models/");
const Product = db.Product;
const Category = db.Category;
const Pet = db.Pet;
const Size = db.Size;
const Weight = db.Weight;
const Color = db.Color;

let mainController = {
  // (get) Root - Mostrar todos los productos
  index: (req, res) => {
    Product.findAll({
      include: [
        { model: Category, as: "categories" },
        { model: Pet, as: "pets" },
        { model: Size, as: "sizes" },
        { model: Weight, as: "weights" },
        { model: Color, as: "colors" },
      ],
    })
      .then((productos) => {
        res.render("home", { productos: productos });
      })
      .catch((error) => console.log(error));
  },
};

module.exports = mainController;