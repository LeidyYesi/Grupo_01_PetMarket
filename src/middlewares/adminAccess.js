function adminAccess(req, res, next) {
    let user = req.session.userLogueado;

    if (!req.session.userLogueado) {
        //si no hay nadie logueado
        res.redirect("/users/login"); //se redirige login para logueo
    } else {
        if (user.categories_id !== 2) {
            // res.send('No eres administrador') //si no es administrador
            res.redirect("/");
        } else {
            next(); //si es administrador
        }
    }
}

module.exports = adminAccess;
