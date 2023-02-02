function logMiddleware(req, res, next) {
    if (req.session.userLogueado){                              //si esta logueado
       return res.redirect("/users/userProfile")                //no se puede ingresar a register o login
    }
    next();                                                      //si esta logueado continua con la peticion llendo al controller
    }

module.exports = logMiddleware;