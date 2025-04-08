"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Heart, Star, Volume2, VolumeX } from "lucide-react"

// Frases de amor con colores asignados
const frases = [
  { texto: "Eres el universo que siempre quise explorar", color: "#ff2d75" },
  { texto: "En cada estrella veo el brillo de tus ojos", color: "#00f7ff" },
  { texto: "Nuestro amor trasciende galaxias enteras", color: "#9d4edd" },
  { texto: "Eres mi constelación favorita", color: "#ffb703" },
  { texto: "Contigo, cada día es un viaje interestelar", color: "#06d6a0" },
  { texto: "Tu amor es la gravedad que me mantiene en órbita", color: "#ef476f" },
  { texto: "Juntos somos una supernova de emociones", color: "#ffd166" },
  { texto: "Mi corazón es un planeta que gira alrededor de ti", color: "#118ab2" },
  { texto: "Eres el cometa que iluminó mi oscuridad", color: "#ff9e00" },
  { texto: "Nuestro amor es infinito como el cosmos", color: "#e63946" },
  { texto: "Cada latido es una estrella que nace por ti", color: "#f72585" },
  { texto: "En la inmensidad del espacio, te encontré a ti", color: "#4cc9f0" },
  { texto: "Eres la nebulosa más hermosa del universo", color: "#7209b7" },
  { texto: "Mi amor por ti es más grande que todas las galaxias", color: "#fb8500" },
  { texto: "Juntos creamos nuestro propio universo", color: "#4361ee" },
]

// Tipos de planetas
const planetas = [
  { tamaño: 60, color: "#ff9e00", velocidad: 0.02, distancia: 150, anillos: false, lunas: 1 },
  { tamaño: 80, color: "#4cc9f0", velocidad: 0.015, distancia: 250, anillos: true, lunas: 2 },
  { tamaño: 40, color: "#f72585", velocidad: 0.025, distancia: 350, anillos: false, lunas: 0 },
  { tamaño: 70, color: "#7209b7", velocidad: 0.01, distancia: 450, anillos: false, lunas: 3 },
  { tamaño: 90, color: "#06d6a0", velocidad: 0.008, distancia: 550, anillos: true, lunas: 1 },
  { tamaño: 50, color: "#ef476f", velocidad: 0.03, distancia: 650, anillos: false, lunas: 2 },
  { tamaño: 65, color: "#118ab2", velocidad: 0.018, distancia: 750, anillos: true, lunas: 0 },
]

// Configuración del sol
const configuracionSol = {
  radio: 120,
  color: "#FDB813",
  brilloCorona: 0.8,
  velocidadPulsacion: 0.001,
  numLlamaradas: 12,
  longitudLlamarada: 80,
}

interface UniversoAmorProps {
  onVolver: () => void
}

export default function UniversoAmor({ onVolver }: UniversoAmorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fraseActual, setFraseActual] = useState(0)
  const [mostrarFrase, setMostrarFrase] = useState(true)
  const [modoInteractivo, setModoInteractivo] = useState(false)
  const [audioActivo, setAudioActivo] = useState(false)
  const [mostrarControles, setMostrarControles] = useState(false)
  const [transicionUniverso, setTransicionUniverso] = useState(false)
  const [agujeroNegroActivo, setAgujeroNegroActivo] = useState(false)
  const [regenerandoUniverso, setRegenerandoUniverso] = useState(false)
  const [mostrarMensajeCorazon, setMostrarMensajeCorazon] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [mariposas, setMariposas] = useState<any[]>([])

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
    const numEstrellas = 800 // Aumentado para más partículas
    const estrellas = Array.from({ length: numEstrellas }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      tamaño: Math.random() * 2 + 0.5,
      brillo: Math.random(),
      velocidadBrillo: Math.random() * 0.02 + 0.005,
    }))

    // Crear nebulosas
    const numNebulosas = 5
    const nebulosas = Array.from({ length: numNebulosas }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radio: Math.random() * 150 + 100,
      color: `hsla(${Math.random() * 360}, 70%, 50%, 0.1)`,
      partículas: Array.from({ length: 100 }, () => ({
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
        tamaño: Math.random() * 3 + 1,
        opacidad: Math.random() * 0.5,
      })),
    }))

    // Crear estrellas fugaces más realistas
    const numEstrellasFugaces = 15 // Aumentado para más estrellas fugaces
    const estrellasFugaces = Array.from({ length: numEstrellasFugaces }, () => crearEstrellaFugaz(canvas))

    // Crear planetas
    const planetasEnOrbita = planetas.map((planeta) => ({
      ...planeta,
      ángulo: Math.random() * Math.PI * 2,
      lunaÁngulos: Array(planeta.lunas)
        .fill(0)
        .map(() => Math.random() * Math.PI * 2),
    }))

    // Función para crear una nueva estrella fugaz
    function crearEstrellaFugaz(canvas: HTMLCanvasElement) {
      const longitud = Math.random() * 150 + 100
      const ángulo = (Math.random() * Math.PI) / 4 + Math.PI / 8 // Ángulo más natural
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

    // Cambiar frase cada 5 segundos
    const intervaloFrase = setInterval(() => {
      setMostrarFrase(false)
      setTimeout(() => {
        setFraseActual((prev) => (prev + 1) % frases.length)
        setMostrarFrase(true)
      }, 500)
    }, 5000)

    // Crear mariposas
    const numMariposas = 15
    const mariposas = Array.from({ length: numMariposas }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      tamaño: Math.random() * 20 + 15,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      velocidadX: Math.random() * 2 - 1,
      velocidadY: Math.random() * 2 - 1,
      ángulo: Math.random() * Math.PI * 2,
      velocidadÁngulo: (Math.random() * 2 - 1) * 0.02,
      aleteo: 0,
      velocidadAleteo: Math.random() * 0.2 + 0.1,
    }))

    setMariposas(mariposas)

    // Función de animación
    let animationFrameId: number
    const animar = (tiempo: number) => {
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

        // Añadir brillo a algunas estrellas
        if (estrella.brillo > 0.8) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(estrella.brillo - 0.8) * 0.5})`
          ctx.beginPath()
          ctx.arc(estrella.x, estrella.y, tamaño * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Dibujar sol
      const centroX = canvas.width / 2
      const centroY = canvas.height / 2

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

      // Dibujar planetas
      planetasEnOrbita.forEach((planeta) => {
        // Actualizar posición
        planeta.ángulo += planeta.velocidad
        const planetaX = centroX + Math.cos(planeta.ángulo) * planeta.distancia
        const planetaY = centroY + Math.sin(planeta.ángulo) * planeta.distancia

        // Dibujar órbita
        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
        ctx.lineWidth = 1
        ctx.arc(centroX, centroY, planeta.distancia, 0, Math.PI * 2)
        ctx.stroke()

        // Dibujar planeta
        ctx.beginPath()
        ctx.fillStyle = planeta.color
        ctx.arc(planetaX, planetaY, planeta.tamaño, 0, Math.PI * 2)
        ctx.fill()

        // Añadir brillo
        const gradiente = ctx.createRadialGradient(planetaX, planetaY, 0, planetaX, planetaY, planeta.tamaño)
        gradiente.addColorStop(0, `${planeta.color}ff`)
        gradiente.addColorStop(0.8, `${planeta.color}aa`)
        gradiente.addColorStop(1, `${planeta.color}00`)

        ctx.beginPath()
        ctx.fillStyle = gradiente
        ctx.arc(planetaX, planetaY, planeta.tamaño, 0, Math.PI * 2)
        ctx.fill()

        // Dibujar anillos si tiene
        if (planeta.anillos) {
          ctx.beginPath()
          ctx.strokeStyle = `${planeta.color}88`
          ctx.lineWidth = planeta.tamaño / 5
          ctx.ellipse(planetaX, planetaY, planeta.tamaño * 1.5, planeta.tamaño * 0.5, planeta.ángulo, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Dibujar lunas
        for (let i = 0; i < planeta.lunas; i++) {
          planeta.lunaÁngulos[i] += 0.03 + i * 0.01
          const lunaX = planetaX + Math.cos(planeta.lunaÁngulos[i]) * (planeta.tamaño * 1.8)
          const lunaY = planetaY + Math.sin(planeta.lunaÁngulos[i]) * (planeta.tamaño * 1.8)

          ctx.beginPath()
          ctx.fillStyle = "#aaaaaa"
          ctx.arc(lunaX, lunaY, planeta.tamaño * 0.2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Dibujar estrellas fugaces
      estrellasFugaces.forEach((estrella, index) => {
        // Verificar si es tiempo de activar la estrella
        if (!estrella.activa && tiempo >= estrella.tiempoInicio) {
          estrella.activa = true
        }

        if (estrella.activa) {
          estrella.progreso += estrella.velocidad / 100

          if (estrella.progreso >= 1) {
            // Reiniciar estrella fugaz
            estrellasFugaces[index] = crearEstrellaFugaz(canvas)
            return
          }

          // Calcular posición actual
          const x = estrella.x + Math.cos(estrella.ángulo) * estrella.longitud * estrella.progreso
          const y = estrella.y + Math.sin(estrella.ángulo) * estrella.longitud * estrella.progreso

          // Calcular opacidad basada en el progreso (efecto de desvanecimiento)
          let opacidad
          if (estrella.progreso < 0.2) {
            opacidad = (estrella.progreso / 0.2) * estrella.brillo
          } else if (estrella.progreso > 0.8) {
            opacidad = ((1 - estrella.progreso) / 0.2) * estrella.brillo
          } else {
            opacidad = estrella.brillo
          }

          // Dibujar estela
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

          // Dibujar brillo en la punta
          ctx.beginPath()
          ctx.fillStyle = `rgba(255, 255, 255, ${opacidad})`
          ctx.arc(x, y, estrella.grosor * 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Añadir resplandor
          ctx.beginPath()
          ctx.fillStyle = `rgba(255, 255, 255, ${opacidad * 0.5})`
          ctx.arc(x, y, estrella.grosor * 3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Dibujar mariposas
      mariposas.forEach((mariposa, index) => {
        // Actualizar posición
        mariposa.x += mariposa.velocidadX
        mariposa.y += mariposa.velocidadY
        mariposa.ángulo += mariposa.velocidadÁngulo
        mariposa.aleteo += mariposa.velocidadAleteo

        // Rebotar en los bordes
        if (mariposa.x < 0 || mariposa.x > canvas.width) mariposa.velocidadX *= -1
        if (mariposa.y < 0 || mariposa.y > canvas.height) mariposa.velocidadY *= -1

        // Dibujar cuerpo
        ctx.save()
        ctx.translate(mariposa.x, mariposa.y)
        ctx.rotate(mariposa.ángulo)

        // Cuerpo
        ctx.beginPath()
        ctx.fillStyle = `hsla(${Number.parseInt(mariposa.color.slice(4))}, 50%, 30%, 0.8)`
        ctx.ellipse(0, 0, mariposa.tamaño * 0.2, mariposa.tamaño * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()

        // Alas con efecto de aleteo
        const aperturaAlas = (Math.sin(mariposa.aleteo) * Math.PI) / 3

        // Ala izquierda
        ctx.save()
        ctx.rotate(-Math.PI / 2 - aperturaAlas)
        ctx.beginPath()
        ctx.fillStyle = mariposa.color + "aa"
        ctx.ellipse(-mariposa.tamaño * 0.3, 0, mariposa.tamaño * 0.8, mariposa.tamaño * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()

        // Brillo en ala izquierda
        const gradienteIzq = ctx.createRadialGradient(
          -mariposa.tamaño * 0.3,
          0,
          0,
          -mariposa.tamaño * 0.3,
          0,
          mariposa.tamaño * 0.8,
        )
        gradienteIzq.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradienteIzq.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
        gradienteIzq.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradienteIzq
        ctx.ellipse(-mariposa.tamaño * 0.3, 0, mariposa.tamaño * 0.8, mariposa.tamaño * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Ala derecha
        ctx.save()
        ctx.rotate(-Math.PI / 2 + aperturaAlas)
        ctx.beginPath()
        ctx.fillStyle = mariposa.color + "aa"
        ctx.ellipse(mariposa.tamaño * 0.3, 0, mariposa.tamaño * 0.8, mariposa.tamaño * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()

        // Brillo en ala derecha
        const gradienteDer = ctx.createRadialGradient(
          mariposa.tamaño * 0.3,
          0,
          0,
          mariposa.tamaño * 0.3,
          0,
          mariposa.tamaño * 0.8,
        )
        gradienteDer.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradienteDer.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
        gradienteDer.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradienteDer
        ctx.ellipse(mariposa.tamaño * 0.3, 0, mariposa.tamaño * 0.8, mariposa.tamaño * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        ctx.restore()

        // Actualizar el array de mariposas
        mariposas[index] = mariposa
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
        const numPartículas = 100
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
        const numCorazones = 150
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

        // Dibujar mensaje en forma de corazón
        if (mostrarMensajeCorazon) {
          // Dibujar un gran corazón en el centro
          const centroX = canvas.width / 2
          const centroY = canvas.height / 2
          const tamañoCorazon = 150

          ctx.beginPath()
          ctx.fillStyle = "#ff2d75"
          ctx.moveTo(centroX, centroY + tamañoCorazon / 4)
          ctx.bezierCurveTo(
            centroX,
            centroY - tamañoCorazon / 2,
            centroX - tamañoCorazon,
            centroY - tamañoCorazon / 2,
            centroX - tamañoCorazon,
            centroY + tamañoCorazon / 4,
          )
          ctx.bezierCurveTo(
            centroX - tamañoCorazon,
            centroY + tamañoCorazon,
            centroX,
            centroY + tamañoCorazon * 1.5,
            centroX,
            centroY + tamañoCorazon * 1.5,
          )
          ctx.bezierCurveTo(
            centroX,
            centroY + tamañoCorazon * 1.5,
            centroX + tamañoCorazon,
            centroY + tamañoCorazon,
            centroX + tamañoCorazon,
            centroY + tamañoCorazon / 4,
          )
          ctx.bezierCurveTo(
            centroX + tamañoCorazon,
            centroY - tamañoCorazon / 2,
            centroX,
            centroY - tamañoCorazon / 2,
            centroX,
            centroY + tamañoCorazon / 4,
          )
          ctx.fill()

          // Añadir brillo al corazón
          const gradienteCorazon = ctx.createRadialGradient(
            centroX - tamañoCorazon / 4,
            centroY - tamañoCorazon / 4,
            0,
            centroX,
            centroY,
            tamañoCorazon * 1.2,
          )
          gradienteCorazon.addColorStop(0, "rgba(255, 255, 255, 0.8)")
          gradienteCorazon.addColorStop(0.5, "rgba(255, 45, 117, 0.5)")
          gradienteCorazon.addColorStop(1, "rgba(255, 45, 117, 0)")

          ctx.beginPath()
          ctx.fillStyle = gradienteCorazon
          ctx.moveTo(centroX, centroY + tamañoCorazon / 4)
          ctx.bezierCurveTo(
            centroX,
            centroY - tamañoCorazon / 2,
            centroX - tamañoCorazon,
            centroY - tamañoCorazon / 2,
            centroX - tamañoCorazon,
            centroY + tamañoCorazon / 4,
          )
          ctx.bezierCurveTo(
            centroX - tamañoCorazon,
            centroY + tamañoCorazon,
            centroX,
            centroY + tamañoCorazon * 1.5,
            centroX,
            centroY + tamañoCorazon * 1.5,
          )
          ctx.bezierCurveTo(
            centroX,
            centroY + tamañoCorazon * 1.5,
            centroX + tamañoCorazon,
            centroY + tamañoCorazon,
            centroX + tamañoCorazon,
            centroY + tamañoCorazon / 4,
          )
          ctx.bezierCurveTo(
            centroX + tamañoCorazon,
            centroY - tamañoCorazon / 2,
            centroX,
            centroY - tamañoCorazon / 2,
            centroX,
            centroY + tamañoCorazon / 4,
          )
          ctx.fill()

          // Texto en el corazón
          ctx.font = "bold 30px Arial"
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("Te amo Yalu", centroX, centroY)
          ctx.fillText("Mi universo", centroX, centroY + 40)
        }
      }

      // Dibujar efectos interactivos
      if (modoInteractivo) {
        // Dibujar cursor interactivo
        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 2
        ctx.arc(variables.mouseX, variables.mouseY, 20, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1
        ctx.arc(variables.mouseX, variables.mouseY, 30, 0, Math.PI * 2)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animar)
      setMariposas([...mariposas])
    }

    // Variables para interacción
    const variables = {
      mouseX: 0,
      mouseY: 0,
      mousePresionado: false,
    }

    // Eventos de ratón
    canvas.addEventListener("mousemove", (e) => {
      variables.mouseX = e.clientX
      variables.mouseY = e.clientY
    })

    canvas.addEventListener("mousedown", () => {
      variables.mousePresionado = true
      if (modoInteractivo) {
        // Crear efecto de partículas al hacer clic
        for (let i = 0; i < 20; i++) {
          const angulo = Math.random() * Math.PI * 2
          const velocidad = Math.random() * 5 + 2
          const tamaño = Math.random() * 4 + 2
          const color = `hsl(${Math.random() * 360}, 100%, 70%)`

          // Aquí podrías añadir las partículas a un array y animarlas
        }
      }
    })

    canvas.addEventListener("mouseup", () => {
      variables.mousePresionado = false
    })

    animationFrameId = requestAnimationFrame(animar)

    // Controlar audio
    if (audioRef.current) {
      if (audioActivo) {
        audioRef.current.play().catch((err) => console.log("Error al reproducir audio:", err))
      } else {
        audioRef.current.pause()
      }
    }

    return () => {
      window.removeEventListener("resize", ajustarTamaño)
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervaloFrase)
    }
  }, [modoInteractivo, agujeroNegroActivo, regenerandoUniverso, mostrarMensajeCorazon, audioActivo, mariposas])

  useEffect(() => {
    if (audioRef.current) {
      if (audioActivo) {
        audioRef.current.play().catch((err) => console.log("Error al reproducir audio:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [audioActivo])

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

  const toggleAudio = () => {
    setAudioActivo(!audioActivo)
  }

  const toggleInteractivo = () => {
    setModoInteractivo(!modoInteractivo)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-fondo-profundo">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <audio ref={audioRef} loop src="/ambient-space.mp3" />

      <button
        onClick={onVolver}
        className="fixed top-4 left-4 z-50 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          mostrarFrase ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center p-6 rounded-lg backdrop-blur-sm bg-black/30 max-w-2xl">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-neon-rosa animate-pulse" />
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 animate-aparecer"
            style={{ color: frases[fraseActual].color, textShadow: `0 0 10px ${frases[fraseActual].color}` }}
          >
            {frases[fraseActual].texto}
          </h1>
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                fill={i <= fraseActual % 5 ? frases[fraseActual].color : "transparent"}
                color={frases[fraseActual].color}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={iniciarTransicionUniverso}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-colors duration-300 z-10"
        disabled={transicionUniverso}
      >
        {transicionUniverso ? "Viajando..." : "Viaje a otro universo"}
      </button>

      <div
        className="absolute bottom-4 right-4 flex flex-col items-end space-y-2"
        onMouseEnter={() => setMostrarControles(true)}
        onMouseLeave={() => setMostrarControles(false)}
      >
        <div className={`transition-opacity duration-300 ${mostrarControles ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={toggleInteractivo}
            className={`p-2 rounded-full backdrop-blur-sm ${
              modoInteractivo ? "bg-pink-500/30" : "bg-black/30"
            } transition-colors`}
            title={modoInteractivo ? "Desactivar modo interactivo" : "Activar modo interactivo"}
          >
            <Star className="w-6 h-6 text-white" />
          </button>
        </div>

        <button
          onClick={toggleAudio}
          className="p-2 rounded-full backdrop-blur-sm bg-black/30 hover:bg-black/50 transition-colors"
          title={audioActivo ? "Silenciar música" : "Reproducir música"}
        >
          {audioActivo ? <Volume2 className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6 text-white" />}
        </button>
      </div>
    </div>
  )
}
