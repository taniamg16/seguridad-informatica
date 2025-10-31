const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// 1. Verifica si el usuario ya tiene una preferencia guardada
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
}

// 2. Cambiar tema al hacer clic
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  // Guarda la preferencia del usuario
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
