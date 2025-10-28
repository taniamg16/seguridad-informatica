document.addEventListener("DOMContentLoaded", () => {

    const quizData=[
        {
            pregunta: "¿Cuál es el tipo de ataque más común en empresas mexicanas según los últimos reportes?",
            respuestas: ["Phishing", "Malware de minería de criptomonedas", "Ransomware"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál de las siguientes contraseñas sería la más segura y fácil de recordar?",
            respuestas: ["Fjst@7954!", "LaMejorIdeaEsIrALaPlaya2025!", "Juan243#"],
            correcta: 1
        },
        {
            pregunta: "¿Qué herramienta te ayuda a saber si tu correo fue filtrado en una brecha de datos?",
            respuestas: ["Have I Been Pwned", "Google Drive", "ChatGPT"],
            correcta: 0
        },
        {
            pregunta: "¿Qué es lo más recomendable hacer si recibes un correo con un enlace que parece urgente?",
            respuestas: ["Hacer clic para ver si es legítimo", "Ignorarlo y borrarlo sin verificar", "Verificar el remitente y acceder solo desde el sitio oficial"],
            correcta: 2
        },
        {
            pregunta: "¿Por qué es importante mantener actualizados tus programas y sistema operativo?",
            respuestas: ["Porque mejora el diseño de la interfaz", "Porque corrige fallas de seguridad que los atacantes pueden aprovechar", "Porque reduce el consumo de batería"],
            correcta: 1
        },
        {
            pregunta: "¿Qué deberías revisar con frecuencia para detectar actividad sospechosa en tus cuentas?",
            respuestas: ["Los dispositivos conectados y ubicaciones de inicio de sesión", "La cantidad de archivos almacenados en la nube", "Las notificaciones de cumpleaños o eventos del calendario"],
            correcta: 0
        },
    ];

    let preguntaActual = 0;
    let calif = 0;
    let respU = [];

    const quizCont = document.getElementById("quiz");
    const siguienteBtn = document.getElementById("siguientebtn");
    const respCont = document.getElementById("result");
    
    function renderBoton() {
    siguienteBtn.textContent = (preguntaActual === quizData.length - 1)
      ? "Ver resultados"
      : "Siguiente";
    }

    function cargaPregunta(){
        const u = quizData[preguntaActual];
        respCont.innerHTML = "";
        quizCont.style.display = "";           
        siguienteBtn.style.display = "";
        quizCont.innerHTML=`
            <div class="fade-in">
                <div class="pregunta">${u.pregunta}</div>
                <div class="respuestas">
                    ${u.respuestas.map((ans, i) => `<div class="resp" data-index="${i}">${ans}</div>`).join("")}
                </div>
            </div>
        `;

        document.querySelectorAll(".resp").forEach(z => {
            z.addEventListener("click", seleccionR);
            z.addEventListener("keypress", ev => {
                if (ev.key === "Enter" || ev.key === " ") seleccionR({ target: z });
            });
        });

        renderBoton();
    }

    function seleccionR(e){
        const selecc=e.target;
        const respI= parseInt(selecc.getAttribute("data-index"));
        const correct=quizData[preguntaActual].correcta;

        respU[preguntaActual] =respI;

        if(respI === correct){
            calif++;
            selecc.style.background= "#00FF88";
            selecc.style.color = "#000";
        } else{
            selecc.style.background = "#FF5555";;
        }
        
        document.querySelectorAll(".resp").forEach(z => z.style.pointerEvents = "none");
    }

    siguienteBtn.addEventListener("click", () => {
        if( respU[preguntaActual] == undefined) respU[preguntaActual] = null;

        preguntaActual++;
        if(preguntaActual < quizData.length) {
            cargaPregunta();
        } else{
            mostrarRespuesta();
        }
    });

    function mostrarRespuesta(){
        quizCont.style.display = "none";
        siguienteBtn.style.display = "none";

        const filas = quizData.map((u, i) => {
            const usIndex = respU[i];
            const esCorrecta = usIndex === u.correcta;
            const tuResp = (usIndex === null || usIndex === undefined) 
                ? "Sin respuesta" 
                : u.respuestas[usIndex];
            const clase = esCorrecta ? "correct" : "wrong";
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td>${tuResp}</td>
                    <td class="${clase}">${u.respuestas[u.correcta]}</td>
                </tr>
            `;
        }).join("");

        respCont.innerHTML=`
            <div class="fade-in">
                <h4 class="fw-bold">Tu puntaje final: ${calif}/${quizData.length}</h4>
                <p>${
                    calif >= 5
                    ? "Felicidades! tus hábitos digitales te protegen bien."
                    : "Aún hay espacio para mejorar. Sigue aprendiendo!"
                }</p>
                <table class="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tu respuesta</th>
                            <th>Respuesta correcta</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>
        `;
    }

    cargaPregunta();

});
