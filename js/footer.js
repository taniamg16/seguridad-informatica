const STORAGE_KEY = 'emails';

//mostrar-ocultar banner
function showBanner(message, ok = true) {
  const banner = document.getElementById('sBanner'); 
  banner.textContent = message;
  banner.classList.remove('d-none', 'alert-success', 'alert-danger');
  banner.classList.add(ok ? 'alert-success' : 'alert-danger');
  // Oculta después de 2.5s
  setTimeout(() => banner.classList.add('d-none'), 2500);
}

//al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('form');  
  const input = document.getElementById('Input');  

  form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // Valida estilo de mail (segun html5)
    if (!input.checkValidity()) {
      showBanner('Correo inválido. Verifica el formato.', false);
      return;
    }

    //quita espacios al principio y final de input
    const email = input.value.trim();
    //en caso de input vacio despues de trim
    if (!email) {
      showBanner('Por favor ingresa un correo.', false);
      return;
    }

    try {
      //lee lista existente en ls
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.push({ email, ts: new Date().toISOString() });

      //guarda en Local Storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      //limpia y confirma
      form.reset();
      showBanner(`¡Gracias! te contactaremos a ${email}`, true);
    } catch (err) {
      console.error(err);
      showBanner('Error guardando tu correo', false);
    }
  });
});



