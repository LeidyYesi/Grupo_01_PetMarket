function logUserMiddleware(req, res, next) {
    res.locals.isLog = false;

    if (req.session.userLogueado) {
		res.locals.isLog = true;
		res.locals.userLogueado = req.session.userLogueado;
	}
    
    next();

}


module.exports = logUserMiddleware;