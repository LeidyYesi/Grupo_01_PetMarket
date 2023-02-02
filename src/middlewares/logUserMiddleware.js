function logUserMiddleware(req, res, next) {
    res.locals.isLog = false;
    
    next();

}


module.exports = logUserMiddleware;