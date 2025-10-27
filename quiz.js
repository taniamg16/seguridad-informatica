document.addEventListener("DOMContentLoaded", () => {

    const quizData=[
        {
            pregunta: "¿Cuál es el tipo de ataque más común en empresas mexicanas según los últimos reportes?",
            respuestas: ["Phishing", "Malware de minería de criptomonedas", "Ransomware"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el tipo de ataque más común en empresas mexicanas según los últimos reportes?",
            respuestas: ["Phishing", "Malware de minería de criptomonedas", "Ransomware"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el tipo de ataque más común en empresas mexicanas según los últimos reportes?",
            respuestas: ["Phishing", "Malware de minería de criptomonedas", "Ransomware"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el tipo de ataque más común en empresas mexicanas según los últimos reportes?",
            respuestas: ["Phishing", "Malware de minería de criptomonedas", "Ransomware"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el tipo de ataque más común en empresas mexicanas según los últimos reportes?",
            respuestas: ["Phishing", "Malware de minería de criptomonedas", "Ransomware"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el tipo de ataque más común en empresas mexicanas según los últimos reportes?",
            respuestas: ["Phishing", "Malware de minería de criptomonedas", "Ransomware"],
            correcta: 2
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
