function authLogMiddelware(req, res, next) {
    if (!req.session.userLogueado){                              //si no hay nadie en session
       return res.redirect("/users/login")                //se redirige login para logueo
    }
    next();                                                     
    }

module.exports = authLogMiddelware;