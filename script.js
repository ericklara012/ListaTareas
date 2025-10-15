document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("nueva-tarea");
  const lista = document.getElementById("lista-tareas");


  cargarTareas();

 
  document.querySelector("button").addEventListener("click", () => {
    const texto = input.value.trim();
    if (texto === "") return;

    if (!localStorage.getItem(texto)) {
      localStorage.setItem(texto, "pendiente");
      agregarElemento(texto, false);
    }

    input.value = "";
  });


  function agregarElemento(texto, completada) {
    const li = document.createElement("li");
    li.textContent = texto;

    if (completada) {
      li.classList.add("completada");
    }

    li.addEventListener("click", () => {
      li.classList.toggle("completada");
      const estado = li.classList.contains("completada") ? "completada" : "pendiente";
      localStorage.setItem(texto, estado);
    });

    lista.appendChild(li);
  }

 
  function cargarTareas() {
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      const valor = localStorage.getItem(clave);
      agregarElemento(clave, valor === "completada");
    }
  }
});
