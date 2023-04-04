window.addEventListener("load", () => {
  let formuLogin = document.querySelector(".crear-formu");
  let errorsLogin = document.querySelector(".errors"); 
  
  let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Definimos nuestra expresión regular para validar el email
  let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/
  //Definimos nuestra expresión regular para validar el Password
  

  formuLogin.addEventListener("submit", (event) => {
    let errors = []; //Guardamos los errores en una variable

    //Validamos q Email no este vacio
    if (formuLogin.email.value == "") {
      //con formuLogin.email.value tengo acceso a lo que ingresa el cte
      errors.push("El campo email esta vacio");
      //console.log("El campo email esta vacio");
      formuLogin.email.classList.remove("is-valid");
      formuLogin.email.classList.add("is-invalid");
    } 
    //Validamos q Email sea valido
    else if(!validEmail.test(email.value)){
      
      errors.push("El email no es valido");
      formuLogin.email.classList.remove("is-valid");
      formuLogin.email.classList.add("is-invalid");
    }
    else {
      formuLogin.email.classList.remove("is-invalid");
      formuLogin.email.classList.add("is-valid");
    };
  
    // Validamos Contraseña
    if (formuLogin.password.value == "") {
      errors.push("El campo password esta vacio");
      //console.log("El campo password esta vacio");
      formuLogin.password.classList.remove("is-valid");
      formuLogin.password.classList.add("is-invalid");
    }  //Validamos q Email sea valido
    else if(!validPassword.test(password.value)){
      
      errors.push("La contraseña debe tener como minimo 8 caracteres, 1 letra mayúscula, 1 minúscula, 1 número y 1 carácter especial");
      formuLogin.password.classList.remove("is-valid");
      formuLogin.password.classList.add("is-invalid");
    }
    else {
      formuLogin.password.classList.remove("is-invalid");
      formuLogin.password.classList.add("is-valid");
    }
    console.log(errors);


    if (errors.length > 0) {
      event.preventDefault(); //detenemos el envio del formu si hay errores
      errorsLogin.innerHTML = ""; //limpiamos el html

      errors.forEach((error) => {
        errorsLogin.innerHTML += "<li>" + error + "</li>";
      });
    } else { 
      formuLogin.sumit();
    }
  });
});
