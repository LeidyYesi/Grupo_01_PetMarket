// ************ Require's ************
const express = require("express");
const path = require('path');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para capturar el body
app.use(express.json()); // Para capturar el body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs'); // Define que el motor que utilizamos es EJS
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ Route System require and use() - (don't touch) ************

const mainRouter = require("./routers/mainRouter.js");
const usersRouter = require("./routers/usersRouter.js");
const productsRouter = require("./routers/productsRouter.js"); 

// Definimos las rutas a los distintos pedidos que nuestro sitio sabe responder

app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// ************ Set the server to listen - (don't touch) ************
app.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030");
});
