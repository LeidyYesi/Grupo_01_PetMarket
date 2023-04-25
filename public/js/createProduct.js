window.addEventListener("load", function () {
  let form = document.querySelector(".form");
  let erroresHtml = document.querySelector(".errores");

  form.addEventListener("submit", function (event) {
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

    if (form.categories_id.value == "") {
      errores.push("Debes que elegir una categoría");
      form.categories_id.classList.remove("is-valid");
      form.categories_id.classList.add("is-invalid");
    } else {
      form.categories_id.classList.remove("is-invalid");
      form.categories_id.classList.add("is-valid");
    }

    if (form.pets_id.value == "") {
      errores.push("Debes que elegir una mascota");
      form.pets_id.classList.remove("is-valid");
      form.pets_id.classList.add("is-invalid");
    } else {
      form.pets_id.classList.remove("is-invalid");
      form.pets_id.classList.add("is-valid");
    }

    if (form.color_id.value == "") {
      errores.push("Debes que elegir un color");
      form.color_id.classList.remove("is-valid");
      form.color_id.classList.add("is-invalid");
    } else {
      form.color_id.classList.remove("is-invalid");
      form.color_id.classList.add("is-valid");
    }

    if (form.weights_id.value == "") {
      errores.push("Debes que elegir el peso");
      form.weights_id.classList.remove("is-valid");
      form.weights_id.classList.add("is-invalid");
    } else {
      form.weights_id.classList.remove("is-invalid");
      form.weights_id.classList.add("is-valid");
    }

    if (form.sizes_id.value == "") {
      errores.push("Debes que elegir el tamaño");
      form.sizes_id.classList.remove("is-valid");
      form.sizes_id.classList.add("is-invalid");
    } else {
      form.sizes_id.classList.remove("is-invalid");
      form.sizes_id.classList.add("is-valid");
    }

    if (form.price.value == "") {
      errores.push("Debes ingresar el precio");
      form.price.classList.remove("is-valid");
      form.price.classList.add("is-invalid");
    } else if (isNaN(form.price.value) || parseFloat(form.price.value) < 0) {
      errores.push("El precio debe ser un número mayor o igual a 0");
      form.price.classList.remove("is-valid");
      form.price.classList.add("is-invalid");
    } else {
      form.price.classList.remove("is-invalid");
      form.price.classList.add("is-valid");
    }

    if (isNaN(form.discount.value) || parseFloat(form.discount.value) < 0 || parseFloat(form.discount.value) > 100) {
      errores.push("El descuento debe ser un número entre 0 y 100");
      form.discount.classList.remove("is-valid");
      form.discount.classList.add("is-invalid");
    } else {
      form.discount.classList.remove("is-invalid");
      form.discount.classList.add("is-valid");
    }

    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(form.img.value)) {
      errores.push(
        "Tienes que subir una imagen en formato JPG, JPEG, PNG o GIF"
      );
      form.img.classList.remove("is-valid");
      form.img.classList.add("is-invalid");
    } else {
      form.img.classList.remove("is-invalid");
      form.img.classList.add("is-valid");
    }

    erroresHtml.innerHTML = "";
    if (errores.length > 0) {
      event.preventDefault();
      errores.forEach((error) => {
        erroresHtml.innerHTML += "<li>" + error + "</li>";
      });
    }
  });
});
