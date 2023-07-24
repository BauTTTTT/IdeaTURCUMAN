// Función agregar una tarea a la lista
function agregarTarea() {
    const tareaInput = document.getElementById("tarea");
    const tareaTexto = tareaInput.value.trim();

    if (tareaTexto === "") {
        alert("Por favor, ingrese una tarea válida.");
        return;
    }

    const tarea = {
        texto: tareaTexto,
        completada: false
    };

// Obtener lista actual en localStorage
    const listaTareas = JSON.parse(localStorage.getItem("listaTareas")) || [];
    listaTareas.push(tarea);

// Guardar lista actualizada en localStorage
    localStorage.setItem("listaTareas", JSON.stringify(listaTareas));

// Limpiar el input y volver a renderizar la lista
    tareaInput.value = "";
    renderizarListaTareas();
}

// Función marcar tarea como completada
function marcarCompletada(index) {
    const listaTareas = JSON.parse(localStorage.getItem("listaTareas"));
    listaTareas[index].completada = true;

// Guardar lista actualizada en el localStorage
    localStorage.setItem("listaTareas", JSON.stringify(listaTareas));

    renderizarListaTareas();
}

// Función eliminar tarea de la lista
function eliminarTarea(index) {
    const listaTareas = JSON.parse(localStorage.getItem("listaTareas"));
    listaTareas.splice(index, 1);

// Guardar la lista actualizada en localStorage
    localStorage.setItem("listaTareas", JSON.stringify(listaTareas));

    renderizarListaTareas();
}

// Función para renderizar la lista en DOM
function renderizarListaTareas() {
    const listaTareas = JSON.parse(localStorage.getItem("listaTareas")) || [];
    const listaTareasElem = document.getElementById("lista-tareas");

    listaTareasElem.innerHTML = "";

    for (let i = 0; i < listaTareas.length; i++) {
        const tarea = listaTareas[i];
        const tareaElem = document.createElement("li");
        tareaElem.textContent = tarea.texto;

        if (tarea.completada) {
            tareaElem.style.textDecoration = "line-through";
        }

// Agrego un evento para marcar la tarea como completada
        tareaElem.addEventListener("click", () => marcarCompletada(i));

// Agrego un evento para eliminar la tarea
        tareaElem.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            eliminarTarea(i);
        });

        listaTareasElem.appendChild(tareaElem);
    }
}

// Asocio evento click al botón "Agregar Tarea"
document.getElementById("agregar").addEventListener("click", agregarTarea);

// Cargar la lista de tareas al recargar la pagina
window.addEventListener("load", renderizarListaTareas);