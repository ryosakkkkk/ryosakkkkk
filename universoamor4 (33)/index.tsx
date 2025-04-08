"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Star } from "lucide-react"

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

export default function UniversoDeAmor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fraseActual, setFraseActual] = useState(0)
  const [mostrarFrase, setMostrarFrase] = useState(true)

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

      // Dibujar planetas
      const centroX = canvas.width / 2
      const centroY = canvas.height / 2

      planetasEnOrbita.forEach((planeta) => {
        // Actualizar posición
        planeta.ángulo += planeta.velocidad
        const planetaX = centroX + Math.cos(planeta.ángulo) * planeta.distancia
        const planetaY = centroY + Math.sin(planeta.ángulo) * planeta.distancia

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

      animationFrameId = requestAnimationFrame(animar)
    }

    animationFrameId = requestAnimationFrame(animar)

    return () => {
      window.removeEventListener("resize", ajustarTamaño)
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervaloFrase)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-fondo-profundo">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${mostrarFrase ? "opacity-100" : "opacity-0"}`}
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
    </div>
  )
}
