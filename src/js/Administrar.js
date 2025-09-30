  let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  let editIndex = -1;

  const form = document.getElementById('serviceForm');
  const tableBody = document.getElementById('serviceTable');

  // Guardar en localStorage
  function saveToLocalStorage() {
    localStorage.setItem("servicios", JSON.stringify(servicios));
  }

  // Guardar servicio
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const servicio = {
      imagen: document.getElementById('imagen').value || "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4",
      nombre: document.getElementById('nombre').value,
      categoria: document.getElementById('categoria').value,
      precio: "$" + Number(document.getElementById('precio').value).toLocaleString(),
      facturacion: document.getElementById('facturacion').value,
      descripcion: document.getElementById('descripcion').value
    };

    if (editIndex === -1) {
      servicios.push(servicio); // Crear
    } else {
      servicios[editIndex] = servicio; // Editar
      editIndex = -1;
    }

    saveToLocalStorage(); // Guardar cambios
    form.reset();
    renderTable();
  });

  // Renderizar tabla
  function renderTable() {
    tableBody.innerHTML = "";
    servicios.forEach((s, index) => {
      tableBody.innerHTML += `
        <tr>
          <td><img src="${s.imagen}" width="50"></td>
          <td>${s.nombre}</td>
          <td>${s.categoria}</td>
          <td>${s.precio}</td>
          <td>${s.facturacion}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="editService(${index})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteService(${index})">Eliminar</button>
          </td>
        </tr>
      `;
    });
  }

  // Editar servicio
  window.editService = (index) => {
    const s = servicios[index];
    document.getElementById('nombre').value = s.nombre;
    document.getElementById('categoria').value = s.categoria;
    document.getElementById('precio').value = s.precio.replace(/\D/g, "");
    document.getElementById('facturacion').value = s.facturacion;
    document.getElementById('imagen').value = s.imagen;
    document.getElementById('descripcion').value = s.descripcion;
    editIndex = index;
  };

  // Eliminar servicio
  window.deleteService = (index) => {
    servicios.splice(index, 1);
    saveToLocalStorage(); // Guardar cambios
    renderTable();
  };

  // Al cargar la página, mostrar datos guardados
  document.addEventListener("DOMContentLoaded", renderTable);