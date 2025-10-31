document.addEventListener('DOMContentLoaded', () => { //espera a q pagina se haya cargado 
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const STORAGE_KEY = 'theme';
 
  function paintIcon() {
    const isDark = body.classList.contains('dark-theme');
    // luna en dark, sol en light
    toggleBtn.textContent = isDark ? '🌙' : '☀️';
    toggleBtn.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    toggleBtn.title = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
  }

  //cargar preferencia de locals
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
  paintIcon(); // pinta icono inicial

  //camnbio en clic
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    paintIcon();
  });
});
