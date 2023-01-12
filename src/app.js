const express = require("express");
const app = express();
const mainRouter = require("./routers/mainRouter.js");
const productCartRouter = require("./routers/cartRouter.js");
const detailRouter = require("./routers/detailRouter.js");
const loginRouter = require("./routers/loginRouter.js");
const registerRouter = require("./routers/registerRouter.js");
const createRouter = require("./routers/createRouter.js");
const editRouter = require("./routers/editRouter.js");

// Usando recursos estáticos.
app.use(express.static("public"));

app.set('view engine','ejs');

// Definimos las rutas a los distintos pedidos que nuestro sitio sabe responder

app.use("/", mainRouter);
app.use("/productCart", productCartRouter);
app.use("/productDetail", detailRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/productCreate", createRouter);
app.use("/productEdit", editRouter);

// Ponemos a escuchar el servidor
app.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030")
});