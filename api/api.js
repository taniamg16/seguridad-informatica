
    const API = "http://127.0.0.1:8000"; // Backend local. Cambiar cuando tengamos dominio
    const $ = (id) => document.getElementById(id); // atajo para no escribir tanto
    const $lista = $("lista"); // donde se muestran las alertas
    const $msg = $("msg"); // donde se muestran mensajes al usuario

    // convierte alerta a --> tarjeta html
    function card(a) {
        // fecha en formato legible
        const fecha = new Date(a.fecha);
        const when = fecha.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

        const tags = (a.tags || []) // deja tags bonitos
            .map(t => `<span class="badge rounded-pill text-bg-secondary me-1">${t}</span>`)
            .join(" ");

        return `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card bg-light border-0 h-100">
                ${a.url ? `
                    <a href="${a.url}" target="_blank" rel="noopener">
                    <img src="${a.imagen || 'https://via.placeholder.com/400x250'}"
                        class="card-img-top"
                        alt="${a.alt || a.titulo}">
                    </a>
                ` : `
                    <img src="${a.imagen || 'https://via.placeholder.com/400x250'}"
                        class="card-img-top"
                        alt="${a.alt || a.titulo}">
                `}
                <div class="card-body">
                    <h5 class="card-title">${a.titulo}</h5>
                    <p class="small text-muted">
                    ${new Date(a.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })} 
                    &middot; Severidad: <strong>${a.severidad}</strong>
                    </p>
                    ${a.descripcion ? `<p class="card-text">${a.descripcion}</p>` : ""}
                    ${a.url ? `<a href="${a.url}" class="btn btn-primary" target="_blank" rel="noopener">Leer más</a>` : ""}
                </div>
                </div>
            </div>
        `;



        
        }

        // carga las alertas desde la api y las muestra
        async function cargar() {
        try {
            $msg.textContent = "Cargando...";
            const res = await fetch(`${API}/api/alerts`); // llama a la api
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
        // botón recargar
        $("btnRecargar").addEventListener("click", cargar);

        (async () => { await cargar(); })(); // carga al iniciar la página
