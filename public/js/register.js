window.addEventListener('load',function(){
    //Capturar el formulario 
    let formulario = document.querySelector('.crear-formu');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit',function(evento){
        // if(!validaciones(evento)){
        //     evento.preventDefault();
        // }else{
        //     console.log("estoy aca");
        //     formulario.submit();
        // }    
        evento.preventDefault();
   
          let {nombre, apellido, email, password, imagen } = formulario.elements;
          let errores = [];
          //Validar Nombre
          console.log(nombre.value)
          if(nombre.value == ''){
             let erroresNombre = document.querySelector('.errores_nombre');
             erroresNombre.innerHTML = "";
             errores.push('Tienes que ingresar un nombre');
             erroresNombre.innerHTML += `${errores[0]}`
             nombre.classList.add('is-invalid');   
              evento.preventDefault(); 
              //errores['first_name'] = 'El campo nombre no puede estar vacio...';
          }else{
              erroresNombre.innerHTML = "";
              first_name.classList.add('is-valid');
              first_name.classList.remove('is-invalid');
          }
        })})

   