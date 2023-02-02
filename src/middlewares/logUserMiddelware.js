function logUserMiddelware(req, res, next) {
    res.locals.isLog = false;
    
    next();

}


module.exports = logUserMiddelware;