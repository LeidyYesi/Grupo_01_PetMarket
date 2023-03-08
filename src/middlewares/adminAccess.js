const model = require("../models/jsonTableFunctions");
const User = model("users"); // models q nos permite hacer operaciones con la BD

function adminAccess(req, res, next) {
    let usuario = req.session.userLogueado;

    if (!req.session.userLogueado) { //si no hay nadie logueado
        return res.redirect("/users/login"); //se redirige login para logueo
    }

    if (usuario.category !== "Administrador") { 
        res.send('No es administrador') //si no es administrador
    } else {
        next(); //si es administrador
    }
    
}

module.exports = adminAccess;
