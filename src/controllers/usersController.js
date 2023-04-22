const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const model = require("../models/jsonTableFunctions");
const moveFile = require("../models/imageDistribution");
// const user = model("users");

const db = require("../database/models/");
const User = db.User;
const Category = db.Category;

let userController = {
  login: function (req, res) {
    res.render("users/login");
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    //Buscamos al usuario
    let userToLogin = req.body.email;
    User.findAll({
      where: {
        email: { [db.Sequelize.Op.eq]: userToLogin },
      },
    }).then((userInDB) => {
      if (userInDB.length != 0) {
        let passwordOk = bcryptjs.compareSync(
          req.body.password,
          userInDB[0].password
        );
        if (passwordOk) {
          delete userToLogin.password; //Eliminamos el password x seguridad
          req.session.userLogueado = userInDB[0]; //Guardamos el usuario en session
          console.log("--------------- Inicio Datos Sesion ---------------");
          console.log(req.session.userLogueado);
          console.log("--------------- Fin Datos Sesion ---------------");
          if (req.body.remember_user) {
            res.cookie("userEmail", req.body.email, { maxAge: 900000 }); // 900000 milisegundos = 15 minutos
          }
          return res.redirect("/");
        }
        return res.render("users/login", {
          errors: {
            password: {
              msg: "Contraseña Incorrecta",
            },
          },
        });
      } else {
        return res.render("users/login", {
          errors: {
            email: {
              msg: "Su email no esta registrado",
            },
          },
        });
      }
    });
  },

  register: function (req, res) {
    res.render("users/register");
  },
  processRegister: function (req, res) {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      let emailToFind = req.body.email;
      User.findAll({
        where: {
          email: { [db.Sequelize.Op.eq]: emailToFind },
        },
      })
        .then((userInDB) => {
          if (userInDB.length != 0) {
            res.render("users/register", {
              errors: {
                email: {
                  msg: "Este email ya está registrado",
                },
              },
              oldData: req.body,
            });
          } else {
            let userToCreate = {
              name: req.body.nombre,
              lastname: req.body.apellido,
              email: req.body.email,
              password: bcryptjs.hashSync(req.body.password, 10),
              categories_id: 1,
              image: req.file.filename,
            };
            User.create(userToCreate)
              .then((user) => {
                let destinationPath = "./public/img/users";
                moveFile(
                  req.file.filename,
                  req.file.destination,
                  destinationPath
                );
                return res.redirect("/users/login");
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => res.send("error es " + error));
    }
  },
  profile: function (req, res) {
    res.render("users/userProfile", {
      user: req.session.userLogueado, //enviamos la variable a la vista
    });
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
  edit: function (req, res) {
    res.render("users/edit", {
      user: req.session.userLogueado, //enviamos la variable a la vista
    });
  },
  processEdit: function (req, res) {
    let resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/edit", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: req.session.userLogueado,
      });
    } else {
      let userId = req.params.id;
      let imageEdit = req.file
        ? req.file.filename
        : req.session.userLogueado.image;
      User.update(
        {
          name: req.body.name,
          lastname: req.body.lastName,
          email: req.body.email,
          image: imageEdit,
        },
        {
          where: { id: userId },
        }
      )
        .then(() => {
          req.session.userLogueado.name = req.body.name;
          req.session.userLogueado.lastname = req.body.lastName;
          req.session.userLogueado.email = req.body.email;
          if (req.file) {
            let destinationPath = "./public/img/users";
            moveFile(req.file.filename, req.file.destination, destinationPath);
            req.session.userLogueado.image = req.file.filename;
          }
          res.clearCookie("userEmail");
          return res.redirect("/users/userProfile");
        })
        .catch((error) => res.send(error));
    }
  },
};

module.exports = userController;
