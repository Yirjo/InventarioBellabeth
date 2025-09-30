// script.js

// Cargar inventario desde localStorage (si existe)
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

const form = document.getElementById("formBody");
const lista = document.getElementById("lista");

// Mostrar los bodys guardados
mostrarInventario();

// Manejar formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const color = document.getElementById("color").value;
  const cantidad = document.getElementById("cantidad").value;
  const fotoInput = document.getElementById("foto");

  // Convertir la imagen a base64 para guardarla
  const reader = new FileReader();
  reader.onload = function (event) {
    const foto = event.target.result;

    const body = { nombre, color, cantidad, foto };
    inventario.push(body);

    // Guardar en localStorage
    localStorage.setItem("inventario", JSON.stringify(inventario));

    mostrarInventario();
    form.reset();
  };
  reader.readAsDataURL(fotoInput.files[0]);
});

// Función para mostrar el inventario
function mostrarInventario() {
  lista.innerHTML = "";
  inventario.forEach((body, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${body.nombre}</h3>
      <p>Color: ${body.color}</p>
      <p>Cantidad: ${body.cantidad}</p>
      <img src="${body.foto}" alt="Foto del body">
      <button onclick="eliminarBody(${index})">Eliminar</button>
    `;
    lista.appendChild(card);
  });
}

// Función para eliminar un body
function eliminarBody(index) {
  inventario.splice(index, 1);
  localStorage.setItem("inventario", JSON.stringify(inventario));
  mostrarInventario();
}
