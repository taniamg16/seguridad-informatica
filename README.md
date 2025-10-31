# Portal de concientización sobre seguridad informática
Introducción al desarrollo web | Proyecto integrador 1

## Integrantes del equipo
| Fotografía | Nombre | Rol |
|-------------|---------|------|
| <img src="img/Tania.jpeg" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Tania Mendoza** | Estructura del sitio y desarrollo de API|
| <img src="img/Ari.jpeg" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Arindal Contreras** | Desarrollo Quiz y estructura del sitio |
| <img src="img/Bernardo.jpg" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Bernardo del Rio** | Diseño visual y desarrollo del footer  |
| <img src="" width="100" height="100" style="border-radius:50%;object-fit:cover;object-position:center top;"> | **Johan Sanchez** | Desarrollo de footer|

## Integrantes del equipo
Este proyecto tiene como objetivo crear una página web educativa sobre ciberseguridad que promueva buenas prácticas digitales, como el uso de contraseñas seguras, la autenticación multifactor (MFA), la actualización de software y la protección contra amenazas comunes como ransomware o phishing.  
El sitio está diseñado con **HTML, CSS, JavaScript y Bootstrap**, y puede complementarse con un backend en **FastAPI** para la gestión de datos o demostraciones de endpoints seguros.

## Front End
```
seguridad-infromática/
|
├── css/
│   ├── classes.css
│   └── quiz-classes.css
├── html/
│   ├── quiz.html
├── js/
│   ├── footer.js
│   ├── gráficas.js
│   ├── quiz.js
│   └── script.js
```
### Archivos de HTML
* index.html: es la página principal de la página. En esta se encuentra el contenido de la página, aquí hallamos la infromación sobre la seguridad informática, las amanezas que el usuario enfrenta y las buenas prácticas que debe implementar
* quiz.html: es una página en la que se desspliega un quiz interactivo donde el usuario pone a prueba sus conocimientos sobre seguridad informática
## Archivos CSS
* classes.css: es un archivo que controla el diseño de la página: la estructura de las imágenes, colores, cambio de tema de oscuro a claro, etc.
* quiz_classes.css: es un archivo que maneja la estructura que se le da a la página del quiz como los colores que se utilizan, los márgenes y el control del mismo quiz
## Archivos JS
* footer.js: es un documento que controla los emails, es decir, los captura y los guarda en LocalStorage.
* gráficas.js: es un documento que interactúa con la API y al momento de conectarse genera gráficas.
* quiz.js: es un documento donde se almacea la estructura que tiene el quiz, despliega las preguntas y procede de acuerdo a la interacción del usuario mostrandole las sigientes preguntas, almacenando respuestas y dando resultados del quiz.
* script.js: es un archivo que básicamente funciona como un interruptor de modo oscuro/claro para la página, permite al usuario cambiar entre temas y recuerda su preferencia.

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

## Dominio de la página
https://introweb.lat
