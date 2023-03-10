const model = require("../models/jsonTableFunctions");
const User = model("users"); // models q nos permite hacer operaciones con la BD

function logUserMiddleware(req, res, next) {
    res.locals.isLog = false;
    res.locals.isAdmin = false;

    let cookieEmail = req.cookies.userEmail; // en esta cookies existe un usuario
    let userFromCookie = User.findByField("email",cookieEmail );  // busco el usuario por el email q tengo en la cookie
    
    if (userFromCookie) {         // si tengo el usuario de la cookie
        req.session.userLogueado = userFromCookie;  // paso todo el usuario a session
    }

    if (req.session.userLogueado) {          // tengo a alguien en sesion?
		res.locals.isLog = true;                // si hay alguien logueado = true
        if (req.session.userLogueado.category == "Administrador") {
            res.locals.isAdmin = true;
        }
		res.locals.userLogueado = req.session.userLogueado;   
	}
 
    next();

}


module.exports = logUserMiddleware;