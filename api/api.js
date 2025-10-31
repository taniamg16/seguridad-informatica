document.addEventListener('DOMContentLoaded', () => {
  const API = "http://127.0.0.1:8000"; // Backend local
  const $ = (id) => document.getElementById(id);

    
  const $msg   = $("msg");   // mensajes al usuario
  const $btn   = $("btnRecargar");
  const $lista = document.getElementById("contenedor-noticias");
  const $form  = $("form-alerta");
  const $formEdit = $("form-actualizar");


  // convierte una alerta en tarjeta HTML
  function card(a) {
    const fecha = new Date(a.fecha ?? a.timestamp); 
    const when  = fecha.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

    const tags = (a.tags || [])
      .map(t => `<span class="badge rounded-pill text-bg-secondary me-1">${t}</span>`)
      .join(" ");

    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card bg-light border-0 h-100">
          ${a.url ? `
            <a href="${a.url}" target="_blank" rel="noopener">
              <img src="${a.imagen || 'https://via.placeholder.com/400x250'}"
                class="card-img-top"
                alt="${a.alt || a.titulo}"
                onerror="this.onerror=null; this.src='https://via.placeholder.com/400x250'; alert('Error al cargar la imagen: ${a.imagen || 'sin ruta'}');">
        
            </a>
          ` : `
            <img src="${a.imagen || 'https://via.placeholder.com/400x250'}"
                 class="card-img-top"
                 alt="${a.alt || a.titulo}">
          `}
          <div class="card-body">
            <h5 class="card-title">${a.titulo}</h5>
            <p class="small text-muted">
              ${when} &middot; Severidad: <strong>${a.severidad}</strong>
            </p>
            ${a.descripcion ? `<p class="card-text">${a.descripcion}</p>` : ""}
            ${a.url ? `<a href="${a.url}" class="btn btn-primary" target="_blank" rel="noopener">Leer más</a>` : ""}
            ${tags ? `<div class="mt-2">${tags}</div>` : ""}
          </div>
        </div>
      </div>
    `;
  }

  // Carga las alertas desde la API y las muestra
  async function cargar() {
    try {
      $msg.textContent = "Cargando...";
      const res = await fetch(`${API}/api/alerts`);
      if (!res.ok) throw new Error("Error al obtener alertas");

      const data = await res.json(); // array de alertas
      const tarjetas = data.map(card).join("");

      $lista.innerHTML = `
        <div class="row g-3 mb-3">
          ${tarjetas}
        </div>
      `;

      $msg.textContent = `Se cargaron ${data.length} alertas.`;
    } catch (e) {
      console.error(e);
      $msg.textContent = "No se pudieron cargar las alertas.";
    }
  }

  // Botón recargar
  $btn.addEventListener("click", cargar);

  // Carga inicial
  cargar();

$form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const titulo      = $("titulo").value.trim();
    const severidad   = $("severidad").value;
    const url         = $("url").value.trim() || null;
    const descripcion = $("descripcion").value.trim() || null;
    const imagen      = $("imagen").value.trim() || null;
    const tagsStr     = $("tags").value.trim();
    const $form  = $("form-alerta");

    const tags = tagsStr
      ? tagsStr.split(",").map(t => t.trim()).filter(t => t.length > 0)
      : [];

  const nuevaAlerta = {
      titulo: titulo,
      severidad: severidad,
      descripcion: descripcion,
      url: url,
      tags: tags,
      imagen: imagen,
      alt: titulo
    };

    try {
      $msg.textContent = "Guardando alerta...";
      const res = await fetch(`${API}/api/alerts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaAlerta)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Error backend:", errText);
        throw new Error("Error al guardar la alerta");
      }

      $form.reset();
      $msg.textContent = "Alerta guardada correctamente.";

      cargar();
    } catch (e) {
      console.error(e);
      $msg.textContent = "No se pudo guardar la alerta.";
    }

  });

  $formEdit.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const id          = Number($("edit-id").value);
    const titulo      = $("edit-titulo").value.trim();
    const severidad   = $("edit-severidad").value;
    const url         = $("edit-url").value.trim();
    const descripcion = $("edit-descripcion").value.trim();
    const imagen      = $("edit-imagen").value.trim();
    const tagsStr     = $("edit-tags").value.trim();

    const body = {};

    if (titulo)      body.titulo = titulo;
    if (severidad)   body.severidad = severidad;
    if (url)         body.url = url;
    if (descripcion) body.descripcion = descripcion;
    if (imagen)      body.imagen = imagen;
    if (tagsStr) {
      body.tags = tagsStr.split(",").map(t => t.trim()).filter(t => t.length > 0);
    }

    try {
      $msg.textContent = "Actualizando alerta...";
      const res = await fetch(`${API}/api/alerts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Error backend:", errText);
        throw new Error("Error al actualizar la alerta");
      }

      $formEdit.reset();
      $msg.textContent = "Alerta actualizada.";
      cargar();
    } catch (e) {
      console.error(e);
      $msg.textContent = "No se pudo actualizar la alerta.";
    }
  });
  

});