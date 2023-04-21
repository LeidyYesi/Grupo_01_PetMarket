window.addEventListener("load", function () {
  //Capturar el formulario
  let formulario = document.querySelector(".crear-formu");
  console.log(formulario.elements.email.value);
  console.log(formulario.elements.name.value);
  console.log(formulario.elements.lastName.value);
  console.log(formulario.elements.img.value);
  formulario.addEventListener("submit", function (evento) {
    if (!validaciones(evento)) {
      evento.preventDefault();
    } else {
      console.log("Se submite");
      //formulario.submit();
    }

    function validaciones(evento) {
      let { name, lastName, email, img } =
        formulario.elements;
      let errores = [];
      //Validar Nombre
      let erroresNombre = document.querySelector(".errores_nombre");
     
      if (name.value == "") {
        erroresNombre.innerHTML = "";
        errores.push("Tienes que ingresar un nombre");
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresNombre.innerHTML += "Tienes que ingresar un nombre";
        name.classList.add("is-invalid");
      } else {
        erroresNombre.innerHTML = "";
        name.classList.remove("is-invalid");
      }

      console.log("name.value",name.value);
      console.log("erroresNombre",erroresNombre);
      console.log("errores",errores);

      let erroresApellido = document.querySelector(".errores_apellido");
      if (lastName.value == "") {
        erroresApellido.innerHTML = "";
        errores.push("Tienes que ingresar un apellido");
        //  erroresNombre.innerHTML += `${errores[0]}`
        erroresApellido.innerHTML += "Tienes que ingresar un apellido";
        lastName.classList.add("is-invalid");
      } else {
        erroresApellido.innerHTML = "";
        lastName.classList.remove("is-invalid");
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
        email.classList.remove("is-invalid");
      }

      
      let erroresImagen = document.querySelector(".errores_imagen");
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (img.value != "") {
        if (!allowedExtensions.exec(img.value)) {
          erroresImagen.innerHTML = "";
          errores.push("Tienes que subir una imagen en formato JPG, JPEG o PNG");
          //  erroresNombre.innerHTML += `${errores[0]}`
          erroresImagen.innerHTML +=
            "Tienes que subir una imagen en formato JPG, JPEG o PNG";
          img.classList.add("is-invalid");
        } else {
          erroresImagen.innerHTML = "";
          img.classList.remove("is-invalid");
        }
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
