const fs = require('fs');
const path = require('path');

/* En la constante "products" ya se tienen los productos que están
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let mainController = {
    // (get) Root - Mostrar todos los productos
    index: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		res.render("home", {productos: products})
	}
}

module.exports = mainController;