const path = require("path");
const { body } = require("express-validator");

const validations = [
  body("name")
    .notEmpty()
    .withMessage("Tienes que ingresar un nombre")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Debe tener al menos cinco letras"),
  body("description")
    .notEmpty()
    .withMessage("Tienes que ingresar una descripcion")
    .bail()
    .isLength({ min: 20 })
    .withMessage("Debe terner al menos 20 caracteres"),
  body("categories_id")
    .notEmpty()
    .withMessage("Tienes que ingresar una categoria"),
  body("pets_id").notEmpty().withMessage("Tienes que ingresar una mascota"),
  body("color_id").notEmpty().withMessage("Tienes que ingresar un color"),
  body("weights_id").notEmpty().withMessage("Tienes que ingresar el peso"),
  body("sizes_id").notEmpty().withMessage("Tienes que ingresar el tamaño"),
  body("price").notEmpty().withMessage("Tienes que ingresar el precio"),
  body("img").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),
];

module.exports = validations;
