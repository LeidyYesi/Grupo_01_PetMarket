window.addEventListener("load", function () {
  //Capturar el formulario
  let formulario = document.querySelector(".crear-formu");
  console.log(formulario.elements.email.value);
  formulario.addEventListener("submit", function (evento) {
    if (!validaciones(evento)) {
      evento.preventDefault();
    } else {
      console.log("Se submite");
      //formulario.submit();
    }

    function validaciones(evento) {
      let { nombre, apellido, email, password, imagen, terminos } =
        formulario.elements;
      let errores = [];
      //Validar Nombre
      let erroresNombre = document.querySelector(".errores_nombre");
      if (nombre.value == "") {
        erroresNombre.innerHTML = "";
        errores.push("Tienes que ingresar un nombre");
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresNombre.innerHTML += "Tienes que ingresar un nombre";
        nombre.classList.add("is-invalid");
      } else {
        erroresNombre.innerHTML = "";
        nombre.classList.add("is-valid");
        nombre.classList.remove("is-invalid");
      }

      let erroresApellido = document.querySelector(".errores_apellido");
      if (apellido.value == "") {
        erroresApellido.innerHTML = "";
        errores.push("Tienes que ingresar un apellido");
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresApellido.innerHTML += "Tienes que ingresar un apellido";
        apellido.classList.add("is-invalid");
      } else {
        erroresApellido.innerHTML = "";
        apellido.classList.add("is-valid");
        apellido.classList.remove("is-invalid");
      }

      let erroresEmail = document.querySelector(".errores_email");
      let formatEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      //   if(email.value == '' )
      if (!formatEmail.test(email.value)) {
        erroresEmail.innerHTML = "";
        errores.push("Tienes que ingresar un correo electrónico valido");
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresEmail.innerHTML +=
          "Tienes que ingresar un correo electrónico valido";
        email.classList.add("is-invalid");
      } else {
        erroresEmail.innerHTML = "";
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
      }

      let erroresPassword = document.querySelector(".errores_password");
      let formatPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

      if (!formatPassword.test(password.value)) {
        erroresPassword.innerHTML = "";
        password.value = "";
        errores.push(
          "La contraseña como minimo debe tener 8 caracteres, 1 letra mayúscula, 1 minúscula, 1 número y 1 carácter especial"
        );
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresPassword.innerHTML +=
          "La contraseña como minimo debe tener 8 caracteres e incluir 1 letra mayúscula, 1 minúscula, 1 número y 1 carácter especial";
        password.classList.add("is-invalid");
      } else {
        erroresPassword.innerHTML = "";
        password.classList.add("is-valid");
        password.classList.remove("is-invalid");
      }

      let erroresImagen = document.querySelector(".errores_imagen");
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(imagen.value)) {
        erroresImagen.innerHTML = "";
        errores.push("Tienes que subir una imagen en formato JPG, JPEG o PNG");
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresImagen.innerHTML +=
          "Tienes que subir una imagen en formato JPG, JPEG o PNG";
        imagen.classList.add("is-invalid");
      } else {
        erroresImagen.innerHTML = "";
        imagen.classList.add("is-valid");
        imagen.classList.remove("is-invalid");
      }

      let erroresTerminos = document.querySelector(".errores_terminos");
      console.log(terminos.checked);
      if (!terminos.checked) {
        erroresTerminos.innerHTML = "";
        errores.push("Tienes que aceptar los terminos");
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresTerminos.innerHTML += "Tienes que aceptar los terminos";
        nombre.classList.add("is-invalid");
      } else {
        erroresTerminos.innerHTML = "";
        terminos.classList.add("is-valid");
        terminos.classList.remove("is-invalid");
      }
      console.log(errores.length);
      if (errores.length > 0) {
        evento.preventDefault();
        errores = [];
      } else {
        return true;
      }
    }
  });
});
