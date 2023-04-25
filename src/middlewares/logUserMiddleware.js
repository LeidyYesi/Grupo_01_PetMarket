const model = require("../models/jsonTableFunctions");
// const User = model("users"); // models q nos permite hacer operaciones con la BD
const db = require("../database/models/");
const User = db.User; // models q nos permite hacer operaciones con la BD

function logUserMiddleware(req, res, next) {
  res.locals.isLog = false;
  res.locals.isAdmin = false;
  res.locals.user = false;

  console.log("req.session", req.session);
  console.log("req.cookies.userEmail", req.cookies.userEmail);
  if (req.session.userLogueado) {
    // tengo a alguien en sesion?
    res.locals.isLog = true; // si hay alguien logueado = true
    if (req.session.userLogueado.categories_id == 2) {
      res.locals.isAdmin = true;
    }else{
      res.locals.user = true;
    }

    res.locals.userLogueado = req.session.userLogueado;
    return next();
  } else if (req.cookies.userEmail) {
    User.findOne({
      where: {
        email: { [db.Sequelize.Op.eq]: req.cookies.userEmail },
      },
    }).then((user) => {
      console.log("user", user);
      req.session.userLogueado = user;
      res.locals.isLog = true;
      if (req.session.userLogueado) {
        if (req.session.userLogueado.categories_id == 2) {
          res.locals.isAdmin = true;
        }else{
          res.locals.user = true;
        }
      }
      res.locals.userLogueado = req.session.userLogueado;
      return next();
    });
  } else {
    return next();
  }
}

module.exports = logUserMiddleware;
