const express = require("express");
const app = express();

// Modulo nativo para manejar las rutas de los archivos
const path = require("path");

// Usando recursos estáticos.
app.use(express.static("public"));


// Definimos las rutas a los distintos pedidos que nuestro sitio sabe responder
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/home.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/register.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/login.html"));
  });

// Ponemos a escuchar el servidor
app.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030")
});