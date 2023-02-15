const User = require("../models/jsonTableFunctions"); // models q nos permite hacer operaciones con la BD

function logUserMiddleware(req, res, next) {

    res.locals.isLog = false;

    if (req.session.userLogueado) {
		res.locals.isLog = true;
		res.locals.userLogueado = req.session.userLogueado;
	}
    
    let cookieEmail = req.cookies.userEmail;
    let userFromCookie = User.findByField("email",cookieEmail );

    console.log(userFromCookie);
   
    next();

}


module.exports = logUserMiddleware;