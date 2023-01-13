const path = require('path');
const fs = require('fs');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
	// (get) Root - Mostrar todos los productos
	index: (req, res) => {
		let home = path.resolve(__dirname,'../views/products/product.ejs');
        res.render(home);
		// res.render("/products/products.ejs")
	},

	// (get) Detail - Detalle de un producto
	detail: (req, res) => {
		let home = path.resolve(__dirname,'../views/products/productDetail.ejs');
        res.render(home);
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
		let home = path.resolve(__dirname,'../views/products/productCreate.ejs');
        res.render(home);
		},
	
	// (post) Create - Método para guardar la info
	// processCreate: (req, res) => {
		
	// },

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		let home = path.resolve(__dirname,'../views/products/productEdit.ejs');
        res.render(home);
	},
	// (put) Update - Método para actualizar la info
	// processEdit: (req, res) => {
		
	// },

	// (delete) Delete - Eliminar un producto de la DB
	// destroy : (req, res) => {
		
	// }
};



module.exports = productsController;