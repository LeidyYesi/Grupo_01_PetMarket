window.addEventListener("load", function () {
  let form = document.querySelector(".form");
  let erroresHtml = document.querySelector(".errores");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let errores = [];

    if (form.name.value == "") {
      errores.push("El nombre no puede estar vacio");
      form.name.classList.remove("is-valid");
      form.name.classList.add("is-invalid");
    } else if (form.name.value.length < 5) {
      errores.push("El nombre debe tener al menos 5 caracteres");
      form.name.classList.remove("is-valid");
      form.name.classList.add("is-invalid");
    } else {
      form.name.classList.remove("is-invalid");
      form.name.classList.add("is-valid");
    }

    if (form.description.value.length < 20) {
      errores.push("La descripcion debe tener al menos 20 caracteres");
      form.description.classList.remove("is-valid");
      form.description.classList.add("is-invalid");
    } else {
      form.description.classList.remove("is-invalid");
      form.description.classList.add("is-valid");
    }

    if (form.categories_id.value == "0") {
      errores.push("Debes que elegir una categoría");
      form.categories_id.classList.remove("is-valid");
      form.categories_id.classList.add("is-invalid");
    } else {
      form.categories_id.classList.remove("is-invalid");
      form.categories_id.classList.add("is-valid");
    }

    if (form.pets_id.value == "0") {
      errores.push("Debes que elegir una mascota");
      form.pets_id.classList.remove("is-valid");
      form.pets_id.classList.add("is-invalid");
    } else {
      form.pets_id.classList.remove("is-invalid");
      form.pets_id.classList.add("is-valid");
    }


    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(form.img.value)) {
      errores.push("Tienes que subir una imagen en formato JPG, JPEG o PNG");
      //  erroresNombre.innerHTML += `${errores[0]}`
      form.img.classList.remove("is-valid");
      form.img.classList.add("is-invalid");
    } else {
      form.img.classList.remove("is-invalid");
      form.img.classList.add("is-valid");
    }

    erroresHtml.innerHTML = "";
    errores.forEach((error) => {
      erroresHtml.innerHTML += "<li>" + error + "</li>";
    });
  });
});
