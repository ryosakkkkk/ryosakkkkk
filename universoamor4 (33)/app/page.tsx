"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import UniversoAmor from "@/components/universo-amor"
import RegaloPrincipal from "@/components/regalo-principal"
import GaleriaRazones from "@/components/galeria-razones"

// 100 frases románticas (exactamente 100)
const frases = [
  { texto: "Eres el amor que ilumina todo mi universo", color: "#ff2d75" },
  { texto: "Mi corazón late al ritmo de tu amor celestial", color: "#00f7ff" },
  { texto: "En cada estrella escribo 'Te amo' infinitamente", color: "#9d4edd" },
  { texto: "Eres el ángel que cayó de las estrellas para amarme", color: "#ffb703" },
  { texto: "Mi amor por ti trasciende todas las galaxias", color: "#06d6a0" },
  { texto: "Eres el amor más hermoso de todo el cosmos", color: "#ef476f" },
  { texto: "Cada latido de mi corazón te pertenece eternamente", color: "#ffd166" },
  { texto: "Tu amor es la fuerza que mueve mi universo entero", color: "#118ab2" },
  { texto: "Eres el destino más hermoso que las estrellas me regalaron", color: "#ff9e00" },
  { texto: "Mi amor por ti brilla más que todas las estrellas juntas", color: "#e63946" },
  { texto: "En cada amanecer cósmico pienso en nuestro amor eterno", color: "#f72585" },
  { texto: "Eres el milagro de amor que el universo me regaló", color: "#4cc9f0" },
  { texto: "Tu amor es la magia que hace brillar mi galaxia", color: "#7209b7" },
  { texto: "Eres el amor más puro que existe en el universo", color: "#fb8500" },
  { texto: "Mi corazón es tuyo en esta vida y en todas las galaxias", color: "#4361ee" },
  { texto: "Cada segundo te amo más que todas las estrellas del cielo", color: "#ff006e" },
  { texto: "Eres el amor que siempre soñé encontrar en el universo", color: "#3a86ff" },
  { texto: "Mi amor por ti es más infinito que el cosmos mismo", color: "#8338ec" },
  { texto: "En cada rincón del universo te amaré eternamente", color: "#ffbe0b" },
  { texto: "Eres el amor que hace latir mi corazón cósmico", color: "#fb5607" },
  { texto: "Mi alma gemela en este vasto universo de amor", color: "#ff006e" },
  { texto: "Cada nebulosa cuenta la historia de nuestro amor", color: "#3a86ff" },
  { texto: "Eres el amor que hace brillar todas mis estrellas", color: "#8338ec" },
  { texto: "Mi corazón baila al ritmo de tu amor celestial", color: "#ffbe0b" },
  { texto: "En cada estrella fugaz pido estar siempre a tu lado", color: "#fb5607" },
  { texto: "Eres el amor que da sentido a mi universo entero", color: "#ff006e" },
  { texto: "Mi amor por ti viaja a través de tiempo y espacio", color: "#3a86ff" },
  { texto: "Juntos escribimos nuestro amor en las estrellas", color: "#8338ec" },
  { texto: "Eres el amor que hace brillar mi constelación", color: "#ffbe0b" },
  { texto: "Mi corazón te pertenece en todas las dimensiones", color: "#fb5607" },
  { texto: "En cada amanecer cósmico te amo más y más", color: "#ff006e" },
  { texto: "Eres el amor que ilumina mi noche estelar", color: "#3a86ff" },
  { texto: "Mi amor por ti brilla en cada rincón del cosmos", color: "#8338ec" },
  { texto: "Juntos somos la más bella historia de amor universal", color: "#ffbe0b" },
  { texto: "Eres el amor que hace girar mi mundo entero", color: "#fb5607" },
  { texto: "Mi corazón te buscaría en mil universos paralelos", color: "#ff006e" },
  { texto: "En cada estrella brilla el reflejo de nuestro amor", color: "#3a86ff" },
  { texto: "Eres el amor más grande de toda la galaxia", color: "#8338ec" },
  { texto: "Mi alma te pertenece en este y todos los universos", color: "#ffbe0b" },
  { texto: "Juntos creamos la más bella nebulosa de amor", color: "#fb5607" },
  { texto: "Eres el amor que hace eterno cada instante", color: "#ff006e" },
  { texto: "Mi corazón late al compás de tu amor sideral", color: "#3a86ff" },
  { texto: "En cada constelación escribo nuestro amor eterno", color: "#8338ec" },
  { texto: "Eres el amor que trasciende toda gravedad", color: "#ffbe0b" },
  { texto: "Mi amor por ti es más fuerte que mil supernovas", color: "#fb5607" },
  { texto: "Juntos somos la más bella danza cósmica de amor", color: "#ff006e" },
  { texto: "Eres el amor que hace brillar mi universo entero", color: "#3a86ff" },
  { texto: "Mi corazón te amaría en cualquier dimensión", color: "#8338ec" },
  { texto: "En cada átomo del cosmos vive nuestro amor", color: "#ffbe0b" },
  { texto: "Eres el amor más puro de toda la creación", color: "#fb5607" },
  { texto: "Mi alma te reconocería en cualquier galaxia", color: "#ff006e" },
  { texto: "Juntos creamos el más bello universo de amor", color: "#3a86ff" },
  { texto: "Eres el amor que hace eterno cada momento", color: "#8338ec" },
  { texto: "Mi corazón te pertenece en toda dimensión", color: "#ffbe0b" },
  { texto: "En cada estrella brilla el eco de nuestro amor", color: "#fb5607" },
  { texto: "Eres el amor que hace infinito lo eterno", color: "#ff006e" },
  { texto: "Mi alma danza al ritmo de tu amor celestial", color: "#3a86ff" },
  { texto: "Juntos somos la más bella historia del cosmos", color: "#8338ec" },
  { texto: "Eres el amor que hace único cada instante", color: "#ffbe0b" },
  { texto: "Mi corazón te amaría en mil vidas estelares", color: "#fb5607" },
  { texto: "En cada nebulosa brilla nuestro amor eterno", color: "#ff006e" },
  { texto: "Eres el amor más puro del universo entero", color: "#3a86ff" },
  { texto: "Mi alma te buscaría entre todas las estrellas", color: "#8338ec" },
  { texto: "Juntos creamos la más bella sinfonía cósmica", color: "#ffbe0b" },
  { texto: "Eres el amor que hace mágico cada momento", color: "#fb5607" },
  { texto: "Mi corazón late al ritmo de las estrellas por ti", color: "#ff006e" },
  { texto: "En cada amanecer cósmico te amo más y más", color: "#3a86ff" },
  { texto: "Eres el amor que hace único nuestro universo", color: "#8338ec" },
  { texto: "Mi alma te pertenece en toda la eternidad", color: "#ffbe0b" },
  { texto: "Juntos brillamos más que todas las estrellas", color: "#fb5607" },
  { texto: "Eres el amor que hace infinito cada instante", color: "#ff006e" },
  { texto: "Mi corazón te amaría en cualquier galaxia", color: "#3a86ff" },
  { texto: "En cada estrella fugaz pido amarte más", color: "#8338ec" },
  { texto: "Eres el amor más bello de todo el cosmos", color: "#ffbe0b" },
  { texto: "Mi alma baila al compás de tu amor sideral", color: "#fb5607" },
  { texto: "Juntos somos la más bella explosión de amor", color: "#ff006e" },
  { texto: "Eres el amor que hace eterno lo infinito", color: "#3a86ff" },
  { texto: "Mi corazón te encuentra en cada constelación", color: "#8338ec" },
  { texto: "En cada rincón del universo vive nuestro amor", color: "#ffbe0b" },
  { texto: "Eres el amor que hace único nuestro destino", color: "#fb5607" },
  { texto: "Mi alma te amaría en mil universos paralelos", color: "#ff006e" },
  { texto: "Juntos creamos la más bella galaxia de amor", color: "#3a86ff" },
  { texto: "Eres el amor que hace mágica cada estrella", color: "#8338ec" },
  { texto: "Mi corazón te pertenece en toda dimensión", color: "#ffbe0b" },
  { texto: "En cada átomo del espacio vive nuestro amor", color: "#fb5607" },
  { texto: "Eres el amor más puro de toda la existencia", color: "#ff006e" },
  { texto: "Mi alma te reconocería entre mil estrellas", color: "#3a86ff" },
  { texto: "Juntos somos el más bello milagro cósmico", color: "#8338ec" },
  { texto: "Eres el amor que hace único cada segundo", color: "#ffbe0b" },
  { texto: "Mi corazón late en sintonía con tu amor", color: "#fb5607" },
  { texto: "En cada nebulosa escribo cuánto te amo", color: "#ff006e" },
  { texto: "Eres el amor que hace brillar mi existencia", color: "#3a86ff" },
  { texto: "Mi alma viaja por el cosmos buscando tu amor", color: "#8338ec" },
  { texto: "Juntos creamos el más bello universo de amor", color: "#ffbe0b" },
  { texto: "Eres el amor que hace eterno cada instante", color: "#fb5607" },
  { texto: "Mi corazón te amaría en cualquier dimensión", color: "#ff006e" },
]

// Tipos de planetas con velocidades corregidas (más lentas)
const planetas = [
  { tamaño: 60, color: "#ff9e00", velocidad: 0.005, distancia: 150, anillos: false, lunas: 1 },
  { tamaño: 80, color: "#4cc9f0", velocidad: 0.003, distancia: 250, anillos: true, lunas: 2 },
  { tamaño: 40, color: "#f72585", velocidad: 0.007, distancia: 350, anillos: false, lunas: 0 },
  { tamaño: 70, color: "#7209b7", velocidad: 0.002, distancia: 450, anillos: false, lunas: 3 },
  { tamaño: 90, color: "#06d6a0", velocidad: 0.0015, distancia: 550, anillos: true, lunas: 1 },
  { tamaño: 50, color: "#ef476f", velocidad: 0.006, distancia: 650, anillos: false, lunas: 2 },
  { tamaño: 65, color: "#118ab2", velocidad: 0.004, distancia: 750, anillos: true, lunas: 0 },
]

// Planetas extendidos con velocidades corregidas
const planetasExtendidos = [
  ...planetas,
  { tamaño: 75, color: "#ff6b6b", velocidad: 0.0025, distancia: 850, anillos: true, lunas: 4, textura: "volcánico" },
  { tamaño: 95, color: "#4ecdc4", velocidad: 0.0018, distancia: 950, anillos: false, lunas: 3, textura: "helado" },
  { tamaño: 55, color: "#ffe66d", velocidad: 0.0045, distancia: 1050, anillos: true, lunas: 2, textura: "gaseoso" },
  { tamaño: 85, color: "#95e1d3", velocidad: 0.0022, distancia: 1150, anillos: false, lunas: 5, textura: "cristalino" },
  { tamaño: 70, color: "#ff8b94", velocidad: 0.0035, distancia: 1250, anillos: true, lunas: 1, textura: "rocoso" },
  { tamaño: 100, color: "#a8e6cf", velocidad: 0.0014, distancia: 1350, anillos: false, lunas: 6, textura: "gaseoso" },
  { tamaño: 65, color: "#ffaaa5", velocidad: 0.0038, distancia: 1450, anillos: true, lunas: 2, textura: "acuático" },
]

// Configuración del sol
const configuracionSol = {
  radio: 120,
  color: "#FDB813",
  brilloCorona: 0.8,
  velocidadPulsacion: 0.0005, // Reducida para movimiento más suave
  numLlamaradas: 12,
  longitudLlamarada: 80,
  corazonCentral: true, // Añadido para mostrar un corazón en el centro del sol
}

// 100 razones para amar a Yalu (exactamente 100)
const razones = [
  "Tu sonrisa ilumina mi mundo entero",
  "Tus ojos son mi universo favorito",
  "Tu risa es mi melodía preferida",
  "Tu amor me hace sentir completo",
  "Tu bondad no tiene límites",
  "Tu apoyo me da fuerzas siempre",
  "Tu inteligencia me inspira",
  "La paz que siento a tu lado",
  "Tu valentía ante todo",
  "Tu forma de escucharme",
  "Tu paciencia infinita",
  "Tu comprensión sin palabras",
  "Tu creatividad sin límites",
  "Cómo me alegras cuando estoy triste",
  "Tu honestidad inquebrantable",
  "Cómo me cuidas siempre",
  "Tu pasión por lo que amas",
  "La forma en que me miras",
  "Tu lealtad absoluta",
  "Tus pequeños detalles diarios",
  "Tu optimismo contagioso",
  "Tus abrazos que sanan todo",
  "Tu sensibilidad única",
  "Cómo me inspiras a ser mejor",
  "Tu determinación admirable",
  "Cómo celebras mis logros",
  "Tu autenticidad siempre",
  "Cómo me aceptas tal como soy",
  "Tu capacidad de perdonar",
  "Cómo me haces sentir amado",
  "Tu espíritu aventurero",
  "El espacio que me das",
  "Tu humildad genuina",
  "Cómo me defiendes siempre",
  "Tu generosidad sin límites",
  "Me haces sentir importante",
  "Ves lo bueno en todo",
  "Me motivas a soñar más",
  "Tu sinceridad fortalecedora",
  "Somos perfectos juntos",
  "Respetas mis decisiones",
  "Contigo me siento en casa",
  "Tu dulzura me derrite",
  "Me das fuerza cuando flaqueo",
  "Tu empatía con todos",
  "Tus sorpresas inesperadas",
  "Me muestras nuevas perspectivas",
  "Me haces sentir protegido",
  "Tu sabiduría me guía",
  "Tus consejos sin juzgar",
  "Tu entusiasmo por la vida",
  "Me haces sentir valorado",
  "Siempre me haces sonreír",
  "Apoyas todas mis decisiones",
  "Iluminas cualquier lugar",
  "Me completas perfectamente",
  "Tu fortaleza me asombra",
  "Me enseñas cosas nuevas",
  "Perdonas y olvidas",
  "Me haces sentir único",
  "Notas cada pequeño detalle",
  "Me demuestras amor diario",
  "Tu compromiso inquebrantable",
  "Soy tu prioridad siempre",
  "Me haces reír de mí mismo",
  "Me ayudas a crecer",
  "Tu intuición asombrosa",
  "Me entiendes completamente",
  "Tus sorpresas constantes",
  "Me haces sentir joven",
  "Tu dedicación a nosotros",
  "Me haces sentir suficiente",
  "Ves más allá de mis defectos",
  "Pertenezco a tu lado",
  "Tu amor incondicional",
  "Contigo todo es posible",
  "Olvido mis preocupaciones",
  "Soy tu prioridad siempre",
  "Ves belleza en lo simple",
  "Nunca me siento solo",
  "Me das paz interior",
  "Soy tu persona favorita",
  "Nuestro amor es eterno",
  "Haces especial cada día",
  "Soy parte de tu vida",
  "Somos un equipo perfecto",
  "Nuestro amor crece diario",
  "Soy tu hogar y refugio",
  "Soy tu confidente eterno",
  "Tu mejor amigo siempre",
  "Nuestro amor es único",
  "Somos almas gemelas",
  "Nuestro amor es mágico",
  "Amor infinito entre nosotros",
  "Trascendemos tiempo juntos",
  "Nuestro amor es cósmico",
  "Amor eterno garantizado",
  "Nuestro amor es universal",
  "Eres mi destino final",
  "Mi corazón te pertenece",
  "Eres mi milagro diario",
  "Contigo todo tiene sentido",
  "Eres mi mayor bendición",
]

function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fraseActual, setFraseActual] = useState(0)
  const [mostrarFrase, setMostrarFrase] = useState(true)
  const [modoInteractivo, setModoInteractivo] = useState(false)
  const [audioActivoCanvas, setAudioActivoCanvas] = useState(false)
  const [mostrarControles, setMostrarControles] = useState(false)
  const [transicionUniverso, setTransicionUniverso] = useState(false)
  const [agujeroNegroActivo, setAgujeroNegroActivo] = useState(false)
  const [regenerandoUniverso, setRegenerandoUniverso] = useState(false)
  const [mostrarMensajeCorazon, setMostrarMensajeCorazon] = useState(false)

  const [mostrarGaleria, setMostrarGaleria] = useState(false)
  const [mostrarUniverso, setMostrarUniverso] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Crear estrellas de fondo
    const crearEstrellas = () => {
      const estrellas = document.getElementById("estrellas-fondo")
      if (!estrellas) return

      estrellas.innerHTML = ""
      const numEstrellas = 300 // Aumentado para más estrellas

      for (let i = 0; i < numEstrellas; i++) {
        const estrella = document.createElement("div")
        estrella.className = "estrella-fondo"
        estrella.style.width = `${Math.random() * 3 + 1}px`
        estrella.style.height = estrella.style.width
        estrella.style.left = `${Math.random() * 100}vw`
        estrella.style.top = `${Math.random() * 100}vh`
        estrella.style.animationDelay = `${Math.random() * 5}s`
        estrellas.appendChild(estrella)
      }
    }

    // Crear corazones flotantes
    const crearCorazones = () => {
      const corazones = document.getElementById("corazones-flotantes")
      if (!corazones) return

      corazones.innerHTML = ""
      const numCorazones = 50 // Aumentado para más corazones

      for (let i = 0; i < numCorazones; i++) {
        const corazon = document.createElement("div")
        corazon.className = "corazon-flotante"
        corazon.style.left = `${Math.random() * 100}vw`
        corazon.style.animationDuration = `${Math.random() * 15 + 10}s`
        corazon.style.animationDelay = `${Math.random() * 10}s`

        // Añadir variedad de colores a los corazones
        const hue = Math.random() * 360
        corazon.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 5px hsl(${hue}, 100%, 70%))`

        corazones.appendChild(corazon)
      }
    }

    // Crear mariposas volando con movimiento más natural
    const crearMariposas = () => {
      const mariposas = document.getElementById("mariposas-volando")
      if (!mariposas) return

      mariposas.innerHTML = ""
      const numMariposas = 25 // Aumentado para más mariposas

      for (let i = 0; i < numMariposas; i++) {
        const mariposa = document.createElement("div")
        mariposa.className = "mariposa"

        // Posición inicial aleatoria
        mariposa.style.left = `${Math.random() * 100}vw`
        mariposa.style.top = `${Math.random() * 100}vh`

        // Tamaño aleatorio
        const tamaño = 20 + Math.random() * 30
        mariposa.style.width = `${tamaño}px`
        mariposa.style.height = `${tamaño}px`

        // Color aleatorio vibrante
        const hue = Math.random() * 360
        mariposa.style.setProperty("--hue", `${hue}`)

        // Velocidad y retraso aleatorios para movimiento más natural
        mariposa.style.animationDuration = `${20 + Math.random() * 40}s`
        mariposa.style.animationDelay = `${Math.random() * 10}s`

        // Añadir trayectoria personalizada para cada mariposa
        const curvaX1 = Math.random() * 100
        const curvaY1 = Math.random() * 100
        const curvaX2 = Math.random() * 100
        const curvaY2 = Math.random() * 100
        mariposa.style.setProperty("--curvaX1", `${curvaX1}vw`)
        mariposa.style.setProperty("--curvaY1", `${curvaY1}vh`)
        mariposa.style.setProperty("--curvaX2", `${curvaX2}vw`)
        mariposa.style.setProperty("--curvaY2", `${curvaY2}vh`)

        // Crear alas con velocidad de aleteo variable
        const alaIzquierda = document.createElement("div")
        alaIzquierda.className = "mariposa-ala izquierda"
        alaIzquierda.style.animationDuration = `${0.2 + Math.random() * 0.3}s`

        const alaDerecha = document.createElement("div")
        alaDerecha.className = "mariposa-ala derecha"
        alaDerecha.style.animationDuration = `${0.2 + Math.random() * 0.3}s`

        const cuerpo = document.createElement("div")
        cuerpo.className = "mariposa-cuerpo"

        mariposa.appendChild(alaIzquierda)
        mariposa.appendChild(alaDerecha)
        mariposa.appendChild(cuerpo)

        mariposas.appendChild(mariposa)
      }
    }

    crearEstrellas()
    crearCorazones()
    crearMariposas()

    // Recrear elementos al cambiar el tamaño de la ventana
    window.addEventListener("resize", () => {
      crearEstrellas()
      crearCorazones()
      crearMariposas()
    })

    return () => {
      window.removeEventListener("resize", () => {
        crearEstrellas()
        crearCorazones()
        crearMariposas()
      })
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (audioActivoCanvas) {
        audioRef.current.play().catch((err) => console.log("Error al reproducir audio:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [audioActivoCanvas])

  const abrirRegalo = () => {
    setMostrarGaleria(true)
  }

  const abrirUniverso = () => {
    setMostrarUniverso(true)
  }

  const volverAlInicio = () => {
    setMostrarGaleria(false)
    setMostrarUniverso(false)
  }

  const toggleAudio = () => {
    setAudioActivoCanvas(!audioActivoCanvas)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el canvas al tamaño de la ventana
    const ajustarTamaño = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", ajustarTamaño)
    ajustarTamaño()

    // Crear estrellas de fondo
    const numEstrellas = 1000 // Aumentado para más partículas
    const estrellas = Array.from({ length: numEstrellas }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      tamaño: Math.random() * 2 + 0.5,
      brillo: Math.random(),
      velocidadBrillo: Math.random() * 0.02 + 0.005,
    }))

    // Crear nebulosas
    const numNebulosas = 8 // Aumentado para más nebulosas
    const nebulosas = Array.from({ length: numNebulosas }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radio: Math.random() * 180 + 120,
      color: `hsla(${Math.random() * 360}, 80%, 60%, 0.15)`,
      partículas: Array.from({ length: 150 }, () => ({
        // Más partículas por nebulosa
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
        tamaño: Math.random() * 3 + 1,
        opacidad: Math.random() * 0.5,
      })),
    }))

    // Crear estrellas fugaces
    const numEstrellasFugaces = 20 // Aumentado para más estrellas fugaces
    const estrellasFugaces = Array.from({ length: numEstrellasFugaces }, () => crearEstrellaFugaz(canvas))

    // Crear planetas
    const planetasEnOrbita = planetasExtendidos.map((planeta) => ({
      ...planeta,
      ángulo: Math.random() * Math.PI * 2,
      lunaÁngulos: Array(planeta.lunas || 0)
        .fill(0)
        .map(() => Math.random() * Math.PI * 2),
      detalles: Array.from({ length: 12 }, () => ({
        // Más detalles por planeta
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        tamaño: Math.random() * 0.3 + 0.1,
        color:
          planeta.textura === "gaseoso"
            ? `${planeta.color}88`
            : planeta.textura === "rocoso"
              ? "#555555"
              : planeta.textura === "acuático"
                ? "#ffffff"
                : planeta.textura === "volcánico"
                  ? "#ff3300"
                  : planeta.textura === "helado"
                    ? "#ffffff"
                    : planeta.textura === "cristalino"
                      ? "#aaddff"
                      : "#888888",
      })),
    }))

    // Función para crear una nueva estrella fugaz
    function crearEstrellaFugaz(canvas: HTMLCanvasElement) {
      const longitud = Math.random() * 150 + 100
      const ángulo = (Math.random() * Math.PI) / 4 + Math.PI / 8
      const velocidad = Math.random() * 5 + 10
      const grosor = Math.random() * 3 + 1
      const brillo = Math.random() * 0.7 + 0.3
      const retraso = Math.random() * 15000 // Retraso aleatorio para aparición

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2), // Aparecen en la mitad superior
        longitud,
        ángulo,
        velocidad,
        grosor,
        brillo,
        activa: false,
        progreso: 0,
        retraso,
        tiempoInicio: performance.now() + retraso,
      }
    }

    // Cambiar frase cada 8 segundos (aumentado para dar más tiempo de lectura)
    const intervaloFrase = setInterval(() => {
      setMostrarFrase(false)
      setTimeout(() => {
        setFraseActual((prev) => (prev + 1) % frases.length)
        setMostrarFrase(true)
      }, 500)
    }, 8000)

    // Variables para interacción
    let mouseX = 0
    let mouseY = 0
    let mousePresionado = false
    let efectoEspecialActivo = false
    let tiempoEfectoEspecial = 0
    let tipoEfectoEspecial = ""
    let centroEfectoX = 0
    let centroEfectoY = 0
    let particulasEfecto: any[] = []

    // Eventos de ratón
    canvas.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    canvas.addEventListener("mousedown", () => {
      mousePresionado = true
      if (modoInteractivo && !efectoEspecialActivo) {
        efectoEspecialActivo = true
        tiempoEfectoEspecial = 0
        tipoEfectoEspecial = Math.random() > 0.5 ? "explosión" : "portal"
        centroEfectoX = mouseX
        centroEfectoY = mouseY

        particulasEfecto = Array.from({ length: 150 }, () => ({
          // Más partículas para efectos
          x: centroEfectoX,
          y: centroEfectoY,
          velocidadX: (Math.random() * 2 - 1) * 5,
          velocidadY: (Math.random() * 2 - 1) * 5,
          tamaño: Math.random() * 3 + 1,
          color:
            tipoEfectoEspecial === "explosión"
              ? `hsl(${Math.floor(Math.random() * 60)}, 100%, 70%)`
              : `hsl(${Math.floor(Math.random() * 60 + 240)}, 100%, 70%)`,
          vida: 1,
        }))

        if (Math.random() > 0.5) {
          const nuevaEstrella = {
            x: mouseX,
            y: mouseY,
            longitud: Math.random() * 200 + 100,
            ángulo: Math.random() * Math.PI * 2,
            velocidad: Math.random() * 6 + 8,
            grosor: Math.random() * 3 + 1,
            brillo: Math.random() * 0.7 + 0.3,
            color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`,
            activa: true,
            progreso: 0,
            retraso: 0,
            tiempoInicio: performance.now(),
          }
          estrellasFugaces.push(nuevaEstrella)
        }
      }
    })

    canvas.addEventListener("mouseup", () => {
      mousePresionado = false
    })

    // Función de animación
    let animationFrameId: number
    let tiempoAnterior = 0
    let tiempo = 0

    const animar = (tiempoActual: number) => {
      tiempo = tiempoActual
      const deltaTime = tiempo - tiempoAnterior
      tiempoAnterior = tiempo

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar fondo
      const gradiente = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradiente.addColorStop(0, "#000428")
      gradiente.addColorStop(1, "#000b4d")
      ctx.fillStyle = gradiente
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar nebulosas
      nebulosas.forEach((nebulosa) => {
        nebulosa.partículas.forEach((partícula) => {
          ctx.save()
          ctx.translate(nebulosa.x, nebulosa.y)
          ctx.fillStyle = nebulosa.color
          ctx.globalAlpha = partícula.opacidad
          ctx.beginPath()
          ctx.arc(partícula.x, partícula.y, partícula.tamaño, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      })

      // Dibujar estrellas de fondo con efecto de brillo
      estrellas.forEach((estrella) => {
        estrella.brillo += estrella.velocidadBrillo
        if (estrella.brillo > 1 || estrella.brillo < 0.3) {
          estrella.velocidadBrillo *= -1
        }

        const opacidad = 0.5 + estrella.brillo * 0.5
        const tamaño = estrella.tamaño * (0.8 + estrella.brillo * 0.4)

        ctx.fillStyle = `rgba(255, 255, 255, ${opacidad})`
        ctx.beginPath()
        ctx.arc(estrella.x, estrella.y, tamaño, 0, Math.PI * 2)
        ctx.fill()

        if (estrella.brillo > 0.8) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(estrella.brillo - 0.8) * 0.5})`
          ctx.beginPath()
          ctx.arc(estrella.x, estrella.y, tamaño * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Dibujar el sol
      const centroX = canvas.width / 2
      const centroY = canvas.height / 2

      dibujarSol(ctx, centroX, centroY, tiempo)

      // Efecto de distorsión del espacio alrededor del sol
      const distorsionRadio = configuracionSol.radio * 3
      const numLineasDistorsion = 50
      for (let i = 0; i < numLineasDistorsion; i++) {
        const angulo = (i / numLineasDistorsion) * Math.PI * 2
        const distorsion = Math.sin(tiempo * 0.001 + i) * 20

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
        ctx.lineWidth = 1
        ctx.moveTo(
          centroX + Math.cos(angulo) * (distorsionRadio + distorsion),
          centroY + Math.sin(angulo) * (distorsionRadio + distorsion),
        )
        ctx.lineTo(
          centroX + Math.cos(angulo) * (distorsionRadio + distorsion + 100),
          centroY + Math.sin(angulo) * (distorsionRadio + distorsion + 100),
        )
        ctx.stroke()
      }

      // Dibujar planetas
      planetasEnOrbita.forEach((planeta) => {
        planeta.ángulo += planeta.velocidad
        const planetaX = centroX + Math.cos(planeta.ángulo) * planeta.distancia
        const planetaY = centroY + Math.sin(planeta.ángulo) * planeta.distancia

        // Dibujar órbita
        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
        ctx.lineWidth = 1
        ctx.arc(centroX, centroY, planeta.distancia, 0, Math.PI * 2)
        ctx.stroke()

        // Dibujar planeta con detalles
        dibujarPlanetaDetallado(ctx, planeta, planetaX, planetaY)

        // Dibujar anillos si tiene
        if (planeta.anillos) {
          ctx.save()
          ctx.translate(planetaX, planetaY)
          ctx.rotate(planeta.ángulo + Math.PI / 4)

          // Anillo principal
          ctx.beginPath()
          ctx.strokeStyle = `${planeta.color}88`
          ctx.lineWidth = planeta.tamaño / 5
          ctx.ellipse(0, 0, planeta.tamaño * 1.8, planeta.tamaño * 0.5, 0, 0, Math.PI * 2)
          ctx.stroke()

          // Anillo secundario
          ctx.beginPath()
          ctx.strokeStyle = `${planeta.color}44`
          ctx.lineWidth = planeta.tamaño / 8
          ctx.ellipse(0, 0, planeta.tamaño * 2.2, planeta.tamaño * 0.6, 0, 0, Math.PI * 2)
          ctx.stroke()

          ctx.restore()
        }

        // Dibujar lunas con más detalle
        for (let i = 0; i < (planeta.lunas || 0); i++) {
          planeta.lunaÁngulos[i] += 0.01 + i * 0.005 // Velocidad reducida para movimiento más suave
          const distanciaLuna = planeta.tamaño * (1.8 + i * 0.3)
          const lunaX = planetaX + Math.cos(planeta.lunaÁngulos[i]) * distanciaLuna
          const lunaY = planetaY + Math.sin(planeta.lunaÁngulos[i]) * distanciaLuna

          // Luna base
          ctx.beginPath()
          ctx.fillStyle = "#aaaaaa"
          ctx.arc(lunaX, lunaY, planeta.tamaño * 0.2, 0, Math.PI * 2)
          ctx.fill()

          // Detalles de la luna
          ctx.beginPath()
          ctx.fillStyle = "#888888"
          ctx.arc(lunaX + planeta.tamaño * 0.08, lunaY - planeta.tamaño * 0.05, planeta.tamaño * 0.08, 0, Math.PI * 2)
          ctx.fill()

          // Brillo de la luna
          const brilloLuna = ctx.createRadialGradient(
            lunaX - planeta.tamaño * 0.1,
            lunaY - planeta.tamaño * 0.1,
            0,
            lunaX,
            lunaY,
            planeta.tamaño * 0.2,
          )
          brilloLuna.addColorStop(0, "rgba(255, 255, 255, 0.3)")
          brilloLuna.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.fillStyle = brilloLuna
          ctx.beginPath()
          ctx.arc(lunaX, lunaY, planeta.tamaño * 0.2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Dibujar estrellas fugaces
      estrellasFugaces.forEach((estrella, index) => {
        if (!estrella.activa && tiempo >= estrella.tiempoInicio) {
          estrella.activa = true
        }

        if (estrella.activa) {
          estrella.progreso += estrella.velocidad / 100

          if (estrella.progreso >= 1) {
            estrellasFugaces[index] = crearEstrellaFugaz(canvas)
            return
          }

          const x = estrella.x + Math.cos(estrella.ángulo) * estrella.longitud * estrella.progreso
          const y = estrella.y + Math.sin(estrella.ángulo) * estrella.longitud * estrella.progreso

          let opacidad
          if (estrella.progreso < 0.2) {
            opacidad = (estrella.progreso / 0.2) * estrella.brillo
          } else if (estrella.progreso > 0.8) {
            opacidad = ((1 - estrella.progreso) / 0.2) * estrella.brillo
          } else {
            opacidad = estrella.brillo
          }

          const longitudEstela = Math.min(estrella.longitud * 0.3, estrella.longitud * estrella.progreso)
          const xInicio = x - Math.cos(estrella.ángulo) * longitudEstela
          const yInicio = y - Math.sin(estrella.ángulo) * longitudEstela

          const gradiente = ctx.createLinearGradient(xInicio, yInicio, x, y)
          gradiente.addColorStop(0, `rgba(255, 255, 255, 0)`)
          gradiente.addColorStop(1, `rgba(255, 255, 255, ${opacidad})`)

          ctx.beginPath()
          ctx.strokeStyle = gradiente
          ctx.lineWidth = estrella.grosor
          ctx.moveTo(xInicio, yInicio)
          ctx.lineTo(x, y)
          ctx.stroke()

          ctx.beginPath()
          ctx.fillStyle = `rgba(255, 255, 255, ${opacidad})`
          ctx.arc(x, y, estrella.grosor * 1.5, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle = `rgba(255, 255, 255, ${opacidad * 0.5})`
          ctx.arc(x, y, estrella.grosor * 3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Efectos de transición entre universos
      if (agujeroNegroActivo) {
        // Dibujar agujero negro creciente
        const radio = ((tiempo % 5000) / 5000) * Math.max(canvas.width, canvas.height) * 1.5

        // Efecto de distorsión espacial
        const gradienteAgujero = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          radio,
        )
        gradienteAgujero.addColorStop(0, "black")
        gradienteAgujero.addColorStop(0.7, "rgba(20, 0, 40, 0.8)")
        gradienteAgujero.addColorStop(0.9, "rgba(50, 0, 100, 0.4)")
        gradienteAgujero.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradienteAgujero
        ctx.arc(canvas.width / 2, canvas.height / 2, radio, 0, Math.PI * 2)
        ctx.fill()

        // Anillo de energía
        ctx.beginPath()
        ctx.strokeStyle = "rgba(100, 50, 255, 0.6)"
        ctx.lineWidth = 5
        ctx.arc(canvas.width / 2, canvas.height / 2, radio * 0.8, 0, Math.PI * 2)
        ctx.stroke()

        // Partículas siendo absorbidas
        const numPartículas = 150 // Aumentado para más partículas
        for (let i = 0; i < numPartículas; i++) {
          const ángulo = Math.random() * Math.PI * 2
          const distancia = radio * (0.2 + Math.random() * 0.8)
          const x = canvas.width / 2 + Math.cos(ángulo) * distancia
          const y = canvas.height / 2 + Math.sin(ángulo) * distancia

          // Dibujar línea hacia el centro
          ctx.beginPath()
          ctx.strokeStyle = `rgba(150, 100, 255, ${Math.random() * 0.5 + 0.2})`
          ctx.lineWidth = Math.random() * 2 + 0.5
          ctx.moveTo(x, y)
          ctx.lineTo(
            canvas.width / 2 + Math.cos(ángulo) * distancia * 0.7,
            canvas.height / 2 + Math.sin(ángulo) * distancia * 0.7,
          )
          ctx.stroke()

          // Dibujar partícula
          ctx.beginPath()
          ctx.fillStyle = `rgba(200, 150, 255, ${Math.random() * 0.7 + 0.3})`
          ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (regenerandoUniverso) {
        // Efecto de regeneración con corazones
        const numCorazones = 200 // Aumentado para más corazones
        for (let i = 0; i < numCorazones; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const tamaño = Math.random() * 25 + 15
          const color = `hsl(${Math.random() * 360}, 100%, 70%)`

          ctx.beginPath()
          ctx.fillStyle = color
          ctx.moveTo(x, y + tamaño / 4)
          ctx.bezierCurveTo(x, y, x - tamaño / 2, y, x - tamaño / 2, y + tamaño / 4)
          ctx.bezierCurveTo(x - tamaño / 2, y + tamaño / 2, x, y + (tamaño * 3) / 4, x, y + tamaño)
          ctx.bezierCurveTo(x, y + (tamaño * 3) / 4, x + tamaño / 2, y + tamaño / 2, x + tamaño / 2, y + tamaño / 4)
          ctx.bezierCurveTo(x + tamaño / 2, y, x, y, x, y + tamaño / 4)
          ctx.fill()

          // Añadir brillo
          ctx.beginPath()
          ctx.fillStyle = `${color.replace(")", ", 0.3)")}`
          ctx.moveTo(x, y + tamaño / 4)
          ctx.bezierCurveTo(x, y, x - tamaño / 2, y, x - tamaño / 2, y + tamaño / 4)
          ctx.bezierCurveTo(x - tamaño / 2, y + tamaño / 2, x, y + (tamaño * 3) / 4, x, y + tamaño)
          ctx.bezierCurveTo(x, y + (tamaño * 3) / 4, x + tamaño / 2, y + tamaño / 2, x + tamaño / 2, y + tamaño / 4)
          ctx.bezierCurveTo(x + tamaño / 2, y, x, y, x, y + tamaño / 4)
          ctx.fill()
        }

        // Efecto de temblor
        ctx.save()
        ctx.translate(Math.random() * 10 - 5, Math.random() * 10 - 5)

        // Efecto de rompimiento de cristal
        const numFragmentos = 30
        for (let i = 0; i < numFragmentos; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const tamaño = Math.random() * 70 + 30

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + tamaño, y + tamaño / 2)
          ctx.lineTo(x + tamaño / 2, y + tamaño)
          ctx.closePath()
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
          ctx.stroke()
        }

        ctx.restore()

        // Dibujar mensaje en forma de corazón
        if (mostrarMensajeCorazon) {
          dibujarTextoCorazon("Te amo Yalu, mi universo", canvas.width / 2, canvas.height / 2, 300, tiempo)
        }
      }

      // Dibujar efectos especiales interactivos
      if (modoInteractivo) {
        // Dibujar cursor interactivo
        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 2
        ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1
        ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animar)
    }

    function dibujarPlanetaDetallado(ctx: CanvasRenderingContext2D, planeta: any, x: number, y: number) {
      // Base del planeta
      ctx.beginPath()
      ctx.fillStyle = planeta.color
      ctx.arc(x, y, planeta.tamaño, 0, Math.PI * 2)
      ctx.fill()

      // Detalles según textura
      planeta.detalles.forEach((detalle: any) => {
        const detalleX = x + detalle.x * planeta.tamaño * 0.8
        const detalleY = y + detalle.y * planeta.tamaño * 0.8

        ctx.beginPath()
        ctx.fillStyle = detalle.color
        ctx.arc(detalleX, detalleY, planeta.tamaño * detalle.tamaño, 0, Math.PI * 2)
        ctx.fill()
      })

      // Efecto de atmósfera
      const gradiente = ctx.createRadialGradient(
        x - planeta.tamaño * 0.3,
        y - planeta.tamaño * 0.3,
        0,
        x,
        y,
        planeta.tamaño,
      )
      gradiente.addColorStop(0, `${planeta.color}ff`)
      gradiente.addColorStop(0.8, `${planeta.color}88`)
      gradiente.addColorStop(1, `${planeta.color}00`)

      ctx.beginPath()
      ctx.fillStyle = gradiente
      ctx.arc(x, y, planeta.tamaño, 0, Math.PI * 2)
      ctx.fill()

      // Brillo especular
      const brilloGradiente = ctx.createRadialGradient(
        x - planeta.tamaño * 0.5,
        y - planeta.tamaño * 0.5,
        0,
        x - planeta.tamaño * 0.5,
        y - planeta.tamaño * 0.5,
        planeta.tamaño * 0.8,
      )
      brilloGradiente.addColorStop(0, "rgba(255, 255, 255, 0.4)")
      brilloGradiente.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = brilloGradiente
      ctx.beginPath()
      ctx.arc(x - planeta.tamaño * 0.5, y - planeta.tamaño * 0.5, planeta.tamaño * 0.8, 0, Math.PI * 2)
      ctx.fill()
    }

    // Función para dibujar el sol con corazón central
    function dibujarSol(ctx: CanvasRenderingContext2D, centroX: number, centroY: number, tiempo: number) {
      // Núcleo del sol
      const gradienteSol = ctx.createRadialGradient(centroX, centroY, 0, centroX, centroY, configuracionSol.radio)
      gradienteSol.addColorStop(0, "#FFF7E6")
      gradienteSol.addColorStop(0.2, "#FFE0B2")
      gradienteSol.addColorStop(0.4, "#FDB813")
      gradienteSol.addColorStop(1, "#FF8C00")

      ctx.beginPath()
      ctx.fillStyle = gradienteSol
      ctx.arc(centroX, centroY, configuracionSol.radio, 0, Math.PI * 2)
      ctx.fill()

      // Corona solar
      const gradienteCorona = ctx.createRadialGradient(
        centroX,
        centroY,
        configuracionSol.radio,
        centroX,
        centroY,
        configuracionSol.radio * 2,
      )
      gradienteCorona.addColorStop(0, "rgba(253, 184, 19, 0.5)")
      gradienteCorona.addColorStop(0.5, "rgba(255, 140, 0, 0.2)")
      gradienteCorona.addColorStop(1, "rgba(255, 69, 0, 0)")

      ctx.beginPath()
      ctx.fillStyle = gradienteCorona
      ctx.arc(centroX, centroY, configuracionSol.radio * 2, 0, Math.PI * 2)
      ctx.fill()

      // Llamaradas solares
      for (let i = 0; i < configuracionSol.numLlamaradas; i++) {
        const angulo = (i / configuracionSol.numLlamaradas) * Math.PI * 2 + tiempo * 0.0005
        const longitud = configuracionSol.longitudLlamarada * (0.8 + Math.sin(tiempo * 0.001 + i) * 0.2)

        const gradienteLlamarada = ctx.createLinearGradient(
          centroX + Math.cos(angulo) * configuracionSol.radio,
          centroY + Math.sin(angulo) * configuracionSol.radio,
          centroX + Math.cos(angulo) * (configuracionSol.radio + longitud),
          centroY + Math.sin(angulo) * (configuracionSol.radio + longitud),
        )

        gradienteLlamarada.addColorStop(0, "rgba(255, 140, 0, 0.8)")
        gradienteLlamarada.addColorStop(0.5, "rgba(255, 69, 0, 0.4)")
        gradienteLlamarada.addColorStop(1, "rgba(255, 0, 0, 0)")

        ctx.beginPath()
        ctx.strokeStyle = gradienteLlamarada
        ctx.lineWidth = 20
        ctx.moveTo(
          centroX + Math.cos(angulo) * configuracionSol.radio,
          centroY + Math.sin(angulo) * configuracionSol.radio,
        )
        ctx.lineTo(
          centroX + Math.cos(angulo) * (configuracionSol.radio + longitud),
          centroY + Math.sin(angulo) * (configuracionSol.radio + longitud),
        )
        ctx.stroke()
      }

      // Efecto de distorsión por calor
      const numOndas = 20
      for (let i = 0; i < numOndas; i++) {
        const angulo = (i / numOndas) * Math.PI * 2
        const amplitud = 15 * Math.sin(tiempo * 0.002 + i)

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
        ctx.lineWidth = 2
        ctx.arc(centroX, centroY, configuracionSol.radio * 2.2 + amplitud, angulo, angulo + Math.PI / numOndas)
        ctx.stroke()
      }

      // Dibujar corazón en el centro si está configurado
      if (configuracionSol.corazonCentral) {
        const tamañoCorazon = configuracionSol.radio * 0.4
        const latido = 1 + Math.sin(tiempo * 0.003) * 0.1

        ctx.save()
        ctx.translate(centroX, centroY)
        ctx.scale(latido, latido)

        // Corazón con color más vibrante
        ctx.beginPath()
        ctx.fillStyle = "#ff1493"
        ctx.moveTo(0, tamañoCorazon * 0.3)
        ctx.bezierCurveTo(
          tamañoCorazon * 0.4,
          -tamañoCorazon * 0.3,
          tamañoCorazon * 0.8,
          tamañoCorazon * 0.2,
          0,
          tamañoCorazon * 0.8,
        )
        ctx.bezierCurveTo(
          -tamañoCorazon * 0.8,
          tamañoCorazon * 0.2,
          -tamañoCorazon * 0.4,
          -tamañoCorazon * 0.3,
          0,
          tamañoCorazon * 0.3,
        )
        ctx.fill()

        // Brillo del corazón
        const gradienteCorazon = ctx.createRadialGradient(
          -tamañoCorazon * 0.2,
          -tamañoCorazon * 0.2,
          0,
          0,
          0,
          tamañoCorazon,
        )
        gradienteCorazon.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradienteCorazon.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
        gradienteCorazon.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradienteCorazon
        ctx.moveTo(0, tamañoCorazon * 0.3)
        ctx.bezierCurveTo(
          tamañoCorazon * 0.4,
          -tamañoCorazon * 0.3,
          tamañoCorazon * 0.8,
          tamañoCorazon * 0.2,
          0,
          tamañoCorazon * 0.8,
        )
        ctx.bezierCurveTo(
          -tamañoCorazon * 0.8,
          tamañoCorazon * 0.2,
          -tamañoCorazon * 0.4,
          -tamañoCorazon * 0.3,
          0,
          tamañoCorazon * 0.3,
        )
        ctx.fill()

        ctx.restore()
      }
    }

    // Enhance heart message function
    function dibujarTextoCorazon(texto: string, x: number, y: number, tamaño: number, tiempo: number) {
      // Efecto de resplandor base mejorado
      ctx.shadowBlur = 40
      ctx.shadowColor = "#ff1493"

      // Corazón principal con gradiente
      const gradienteCorazon = ctx.createRadialGradient(x, y, 0, x, y, tamaño)
      gradienteCorazon.addColorStop(0, "#ff69b4")
      gradienteCorazon.addColorStop(0.5, "#ff1493")
      gradienteCorazon.addColorStop(1, "#c71585")

      const escala = tamaño / 30
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(escala, escala)

      // Dibujar corazón pulsante
      const pulsacion = 1 + Math.sin(tiempo * 0.002) * 0.1
      ctx.scale(pulsacion, pulsacion)

      ctx.beginPath()
      ctx.moveTo(0, 10)
      ctx.bezierCurveTo(-25, -25, -25, 10, 0, 35)
      ctx.bezierCurveTo(25, 10, 25, -25, 0, 10)
      ctx.fillStyle = gradienteCorazon
      ctx.fill()
      ctx.restore()

      // Partículas brillantes orbitando
      const numParticulas = 50
      for (let i = 0; i < numParticulas; i++) {
        const angulo = tiempo * 0.001 + (i / numParticulas) * Math.PI * 2
        const distancia = tamaño * (0.8 + Math.sin(tiempo * 0.002 + i) * 0.2)
        const particleX = x + Math.cos(angulo) * distancia
        const particleY = y + Math.sin(angulo) * distancia

        // Estrellas brillantes
        const estrellaTamaño = 3 + Math.sin(tiempo * 0.003 + i) * 2
        ctx.beginPath()
        ctx.fillStyle = `hsla(${(i * 360) / numParticulas + tiempo * 0.1}, 100%, 75%, ${0.6 + Math.sin(tiempo * 0.002 + i) * 0.4})`
        for (let p = 0; p < 5; p++) {
          const starAngle = (p * Math.PI * 2) / 5 - Math.PI / 2
          const x1 = particleX + Math.cos(starAngle) * estrellaTamaño
          const y1 = particleY + Math.sin(starAngle) * estrellaTamaño
          if (p === 0) ctx.moveTo(x1, y1)
          else ctx.lineTo(x1, y1)
        }
        ctx.closePath()
        ctx.fill()
      }

      // Texto con efecto mejorado
      ctx.font = `bold ${tamaño / 5}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Sombra exterior del texto
      ctx.shadowBlur = 30
      ctx.shadowColor = "#ff69b4"
      ctx.fillStyle = "#ffffff"
      ctx.fillText(texto, x, y)

      // Texto principal con gradiente
      const gradienteTexto = ctx.createLinearGradient(x - tamaño / 2, y, x + tamaño / 2, y)
      gradienteTexto.addColorStop(0, "#ff69b4")
      gradienteTexto.addColorStop(0.5, "#ff1493")
      gradienteTexto.addColorStop(1, "#ff69b4")

      ctx.shadowBlur = 15
      ctx.fillStyle = gradienteTexto
      ctx.fillText(texto, x, y)

      // Pequeños corazones flotando
      const numCorazones = 12
      for (let i = 0; i < numCorazones; i++) {
        const angle = tiempo * 0.001 + (i / numCorazones) * Math.PI * 2
        const heartDist = tamaño * 1.2
        const heartX = x + Math.cos(angle) * heartDist
        const heartY = y + Math.sin(angle) * heartDist
        const heartSize = 10 + Math.sin(tiempo * 0.002 + i) * 5

        ctx.save()
        ctx.translate(heartX, heartY)
        ctx.rotate(angle)
        ctx.scale(heartSize / 20, heartSize / 20)

        ctx.beginPath()
        ctx.fillStyle = `hsla(${i * 30 + tiempo * 0.1}, 100%, 75%, ${0.6 + Math.sin(tiempo * 0.002 + i) * 0.4})`
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10)
        ctx.bezierCurveTo(10, 0, 5, -5, 0, 0)
        ctx.fill()
        ctx.restore()
      }

      ctx.shadowBlur = 0
    }

    animationFrameId = requestAnimationFrame(animar)

    return () => {
      window.removeEventListener("resize", ajustarTamaño)
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervaloFrase)
    }
  }, [modoInteractivo, agujeroNegroActivo, regenerandoUniverso, mostrarMensajeCorazon])

  const iniciarTransicionUniverso = () => {
    setTransicionUniverso(true)
    setAgujeroNegroActivo(true)

    // Primer paso: Agujero negro crece
    setTimeout(() => {
      setAgujeroNegroActivo(false)
      setRegenerandoUniverso(true)
      setMostrarMensajeCorazon(true)

      // Segundo paso: Regeneración del universo
      setTimeout(() => {
        setRegenerandoUniverso(false)
        setMostrarMensajeCorazon(false)
        setTransicionUniverso(false)
      }, 8000) // Tiempo para regenerar el universo
    }, 5000) // Tiempo para que el agujero negro "coma" todo
  }

  if (mostrarUniverso) {
    return <UniversoAmor onVolver={volverAlInicio} />
  }

  return (
    <main className="min-h-screen bg-fondo-profundo overflow-hidden relative">
      <div id="estrellas-fondo" className="fixed inset-0 z-0"></div>
      <div id="corazones-flotantes" className="fixed inset-0 z-10 pointer-events-none"></div>
      <div id="mariposas-volando" className="fixed inset-0 z-10 pointer-events-none"></div>

      <audio ref={audioRef} loop src="/ambient-space.mp3" />

      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
        title={audioActivoCanvas ? "Silenciar música" : "Reproducir música"}
      >
        {audioActivoCanvas ? <Volume2 className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6 text-white" />}
      </button>

      {mostrarGaleria ? (
        <GaleriaRazones razones={razones} onVolver={volverAlInicio} onAbrirUniverso={abrirUniverso} />
      ) : (
        <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-white animate-aparecer">
            <span className="text-neon-rosa">100 Razones</span> Para Amarte Yalu
            <div className="text-2xl md:text-3xl mt-2 text-pink-300">Feliz 5 meses, infinito amor ♾️</div>
          </h1>

          <RegaloPrincipal onAbrir={abrirRegalo} />

          <p className="mt-8 text-white/80 text-center max-w-md animate-aparecer animation-delay-300">
            Haz clic en el regalo para descubrir las 100 razones por las que mi amor por ti es infinito como el universo
          </p>
        </div>
      )}
    </main>
  )
}

export default Page
