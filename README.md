# Portal de concientización sobre seguridad informática
Introducción al desarrollo web | Proyecto integrador 1

## Integrantes del equipo
| Fotografía | Nombre | Rol |
|-------------|---------|------|
| <img src="img/Tania.jpeg" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Tania Martínez** | Estructura del sitio y desarrollo de API|
| <img src="img/Ari.jpeg" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Arindal Contreras** | Desarrollo Quiz y estructura del sitio |
| <img src="" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Bernardo del Rio** | Diseño visual y desarrollo del footer  |
| <img src="" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Johan Sanchez** | Desarrollo del footer|

## Integrantes del equipo
Este proyecto tiene como objetivo crear una página web educativa sobre ciberseguridad que promueva buenas prácticas digitales, como el uso de contraseñas seguras, la autenticación multifactor (MFA), la actualización de software y la protección contra amenazas comunes como ransomware o phishing.  
El sitio está diseñado con **HTML, CSS, JavaScript y Bootstrap**, y puede complementarse con un backend en **FastAPI** para la gestión de datos o demostraciones de endpoints seguros.

## Instrucciones para levantar el frontend
1. Clona el repositorio:
   ````bash
   git clone https://github.com/taniamg16/seguridad-informatica.git
   cd seguridad-informatica
   ````
2. En la terminal
    ````
    open index.html
    ````
## Instrucciones para levantar el backend
1. Crea y activa un entorno virtual:
    ````
    python3 -m venv .venv
    source .venv/bin/activate  
    # o en Windows:
    .venv\Scripts\activate
    ````
2. Instalamos las dependencias:
    ````
    pip install -r requirements.txt
    ````
3. Levantamos el servidor con Uvicorn:
    ````
    uvicorn main:app --reload
    ````

