const path = require("path");
const { body } = require("express-validator");

const validations = [
  body("name").notEmpty().withMessage("Tienes que ingresar un nombre"),
  body("lastName").notEmpty().withMessage("Tienes que ingresar un apellido"),
  body("email")
    .notEmpty()
    .withMessage("Tienes que ingresar un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido"),
  body("img").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];

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
