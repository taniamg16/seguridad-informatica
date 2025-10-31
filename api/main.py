# este es el backend de nuestra página web
# funciona como api REST simple que devuelve alertas de ciberseguridad
# main.py
from fastapi import FastAPI, HTTPException # para las excepciones
from fastapi.middleware.cors import CORSMiddleware # para que el frontend consuma api
from pydantic import BaseModel # para definir modelos de datos
from typing import List, Optional # para tipos de datos
from datetime import datetime # para los timestamps

app = FastAPI(title="Cyber Alerts API")

# CORS para permitir que html (localhost) acceda a la api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # ya que tengamos dominio cambiar por allow_origins=["http://localhost:5500","https://dominio.com"]
    allow_methods=["*"],
    allow_headers=["*"],
)
# Esquemas de datos

# lo que recibe por post la api al crear una alerta
class Alert(BaseModel):
    titulo: str
    fecha: datetime
    severidad: str = "Media"     # default es media      
    descripcion: Optional[str] = None
    url: Optional[str] = None
    tags: Optional[List[str]] = []
    id: int
    imagen: Optional[str] = None
    alt: Optional[str] = None

class AlertCreate(BaseModel):
    titulo: str
    severidad: str = "Media"
    descripcion: Optional[str] = None
    url: Optional[str] = None
    tags: Optional[List[str]] = []
    imagen: Optional[str] = None
    alt: Optional[str] = None

class AlertUpdate(BaseModel):
    titulo: Optional[str] = None
    severidad: Optional[str] = None
    descripcion: Optional[str] = None
    url: Optional[str] = None
    tags: Optional[List[str]] = None
    imagen: Optional[str] = None
    alt: Optional[str] = None
    
# Memoria
DB: List[Alert] = [] #nuestra "base de datos" en memoria
NEXT_ID = 1 # contador de ids

# Semilla: datos iniciales
def seed():
    global NEXT_ID
    alertas = [
        Alert(id=NEXT_ID,   titulo="Campaña global de smishing del grupo “Smishing Triad” involucra más de 194 000 dominios maliciosos",
              fecha="2025-10-24T00:00:00", severidad="Alta",
              descripcion="Un vasto operativo de “smishing” (phishing vía SMS) con más de 194 000 dominios registrados desde enero de 2024 apunta a múltiples industrias globales con falsos avisos de paquetes o infracciones.",
              url="https://thehackernews.com/2025/10/smishing-triad-linked-to-194000.html", tags=["phishing","smishing"],
              imagen="../api/static/smishing.jpg", alt="Imagen de campaña de smishing"
              )]
    NEXT_ID += 1
    alertas.append(
        Alert(id=NEXT_ID,   titulo="Fallo crítico en Windows Server Update Services (WSUS) con explotación activa detectada",
              fecha="2025-10-24T00:00:00", severidad="Alta",
              descripcion="Microsoft parchó de urgencia una vulnerabilidad de ejecución remota (CVE-2025-59287) en WSUS que ya está siendo explotada en entornos corporativos.",
              url="https://thehackernews.com/2025/10/microsoft-issues-emergency-patch-for.html", tags=["vulnerabilidad","windows-server", "explotación-activa"],
              imagen="../api/static/windows.jpg", alt="Imagen de Windows Server"
              )
    )
    NEXT_ID += 1
    alertas.append(
        Alert(id=NEXT_ID,   titulo="3,000 videos de YouTube utilizados como trampas de malware en operación “Ghost Network”",
              fecha="2025-10-24T00:00:00", severidad="Alta",
              descripcion="Una red maliciosa ha publicado más de 3 000 vídeos en YouTube usando cuentas comprometidas para distribuir malware tipo “stealer” aprovechando tutoriales populares.",
              url="https://thehackernews.com/2025/10/3000-youtube-videos-exposed-as-malware.html", tags=["malware","youtube", "ghost-network"],
              imagen="../api/static/youtube.jpg", alt="Imagen de Youtube"
              )
    )
    NEXT_ID += 1
    alertas.append(
        Alert(id=NEXT_ID,   titulo="Gusano auto-propagador “GlassWorm” infecta extensiones de Visual Studio Code en ataque de cadena de suministro",
              fecha="2025-10-24T00:01:00", severidad="Alta",
              descripcion="El malware apodado “GlassWorm” se difunde a través de extensiones de VS Code “hijackeadas”, usando blockchain Solana y Calendar de Google para control de comando, comprometiendo el entorno de desarrolladores.",
              url="https://thehackernews.com/2025/10/self-spreading-glassworm-infects-vs.html", tags=["malware","gusano", "vs-code"],
              imagen="../api/static/glassworm.jpg", alt="Imagen de operación GlassWorm"
              )
    )
    NEXT_ID += 1
    alertas.append(
        Alert(id=NEXT_ID,   titulo="Hackers norcoreanos atraen ingenieros de defensa con empleos falsos para robar secretos de drones",
              fecha="2025-10-23T00:00:00", severidad="Alta",
              descripcion="El grupo de amenazas vinculado a Lazarus Group usa falsas ofertas laborales para acceder a compañías europeas del sector UAV y sustraer información para el programa de drones norcoreano",
              url="https://thehackernews.com/2025/10/north-korean-hackers-lure-defense.html", tags=["espionaje","uav-drones", "lazarus-group"],
              imagen="../api/static/drone-hacking.jpg", alt="Imagen Drone Hacking"
              )
    )
    NEXT_ID += 1
    alertas.append(
        Alert(id=NEXT_ID,   titulo="Campaña de espionaje “PassiveNeuron” compromete servidores Windows Server",
              fecha="2025-10-22T00:00:00", severidad="Alta",
              descripcion="La firma Kaspersky identificó que la APT PassiveNeuron ha estado usando los backdoors personalizados Neursite y NeuralExecutor para infiltrarse en servidores Windows Server de gobiernos, finanzas e industria en Asia, África y América Latina.",
              url="https://thehackernews.com/2025/10/researchers-identify-passiveneuron-apt.html", tags=["apt","espionaje", "windows-server"],
              imagen="../api/static/cyberattack.jpg", alt="Imagen de Cyberattack"
              )
    )
    DB.extend(alertas)

seed()

# Endpoints
# get normalito con conteo de alertas
@app.get("/")
def health():
    return {"ok": True, "count": len(DB)}

# get para listar alertas
@app.get("/api/alerts", response_model=List[Alert])
def listar_alertas():
    return DB


@app.post("/api/alerts", response_model=Alert)
def crear_alerta(alerta_in: AlertCreate):
    global NEXT_ID, DB

    alerta = Alert(
        id=NEXT_ID,
        titulo=alerta_in.titulo,
        fecha=datetime.utcnow(),   # la fecha la pone el servidor
        severidad=alerta_in.severidad,
        descripcion=alerta_in.descripcion,
        url=alerta_in.url,
        tags=alerta_in.tags,
        imagen=alerta_in.imagen,
        alt=alerta_in.alt or alerta_in.titulo
    )
    NEXT_ID += 1
    DB.append(alerta)
    return alerta

@app.put("/api/alerts/{alert_id}", response_model=Alert)
def actualizar_alerta(alert_id: int, alerta_in: AlertUpdate):
    # buscar la alerta
    for i, alerta in enumerate(DB):
        if alerta.id == alert_id:
            # actualizar solo lo que venga
            data = alerta.model_dump()
            if alerta_in.titulo is not None:
                data["titulo"] = alerta_in.titulo
            if alerta_in.severidad is not None:
                data["severidad"] = alerta_in.severidad
            if alerta_in.descripcion is not None:
                data["descripcion"] = alerta_in.descripcion
            if alerta_in.url is not None:
                data["url"] = alerta_in.url
            if alerta_in.tags is not None:
                data["tags"] = alerta_in.tags
            if alerta_in.imagen is not None:
                data["imagen"] = alerta_in.imagen
            if alerta_in.alt is not None:
                data["alt"] = alerta_in.alt

            # volvemos a crear el objeto Alert ya actualizado
            alerta_actualizada = Alert(**data)
            DB[i] = alerta_actualizada
            return alerta_actualizada

    # si no lo encontró
    raise HTTPException(status_code=404, detail="Alerta no encontrada")
