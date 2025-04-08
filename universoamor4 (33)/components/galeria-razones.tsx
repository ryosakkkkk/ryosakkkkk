"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Heart } from "lucide-react"
import TarjetaRazon from "./tarjeta-razon"

interface GaleriaRazonesProps {
  razones: string[]
  onVolver: () => void
  onAbrirUniverso: () => void
}

export default function GaleriaRazones({ razones, onVolver, onAbrirUniverso }: GaleriaRazonesProps) {
  const [tarjetasVisibles, setTarjetasVisibles] = useState(false)
  const [tarjetasAbiertas, setTarjetasAbiertas] = useState<number[]>([])
  const [mostrarMensaje, setMostrarMensaje] = useState(false)
  const [mensajeEspecial, setMensajeEspecial] = useState("")
  const [animacionEspecial, setAnimacionEspecial] = useState(false)
  const animacionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mostrar las tarjetas con un pequeño retraso para la animación
    setTimeout(() => {
      setTarjetasVisibles(true)
    }, 300)
  }, [])

  // Función para abrir tarjetas sin condiciones
  const abrirTarjeta = (index: number) => {
    // Si la tarjeta ya está abierta, no hacer nada
    if (tarjetasAbiertas.includes(index)) return

    // Añadir la tarjeta a las abiertas
    setTarjetasAbiertas((prev) => [...prev, index])

    // Si es la tarjeta 99 (índice 98), mostrar animación especial
    if (index === 98) {
      setAnimacionEspecial(true)

      // Después de la animación, mostrar mensaje y volver a la galería
      setTimeout(() => {
        setAnimacionEspecial(false)
        setMensajeEspecial("¡Has encontrado el hilo del destino! La tarjeta 100 te espera con un universo de amor...")
        setMostrarMensaje(true)
        setTimeout(() => setMostrarMensaje(false), 5000)
      }, 15000) // La animación dura 15 segundos
    }

    // Si es la tarjeta 100 (índice 99), abrir el universo directamente
    if (index === 99) {
      setMensajeEspecial("¡Descubriste el universo de nuestro amor! Preparando viaje interestelar...")
      setMostrarMensaje(true)

      // Crear efecto de explosión de corazones
      crearExplosionCorazones()

      // Abrir el universo después de una breve animación
      setTimeout(() => {
        onAbrirUniverso()
      }, 3000)
    }
  }

  // Mejorar la función de explosión de corazones para un efecto más 3D
  const crearExplosionCorazones = () => {
    const contenedor = document.getElementById("explosion-corazones")
    if (!contenedor) return

    contenedor.innerHTML = ""
    const numCorazones = 200 // Aumentado para más partículas

    for (let i = 0; i < numCorazones; i++) {
      const corazon = document.createElement("div")
      corazon.className = Math.random() > 0.7 ? "estrella-explosion" : "corazon-explosion"

      const angulo = Math.random() * Math.PI * 2
      const distancia = 50 + Math.random() * 500
      const duracion = 1 + Math.random() * 3
      const delay = Math.random() * 0.8
      const tamaño = 10 + Math.random() * 40

      corazon.style.width = `${tamaño}px`
      corazon.style.height = `${tamaño}px`
      corazon.style.setProperty("--angulo", `${angulo}rad`)
      corazon.style.setProperty("--distancia", `${distancia}px`)
      corazon.style.animationDuration = `${duracion}s`
      corazon.style.animationDelay = `${delay}s`

      // Color aleatorio entre toda la gama
      const hue = Math.random() * 360
      corazon.style.backgroundColor =
        corazon.className === "corazon-explosion" ? "transparent" : `hsl(${hue}, 100%, 70%)`
      corazon.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 70%)`
      corazon.style.setProperty("--hue", `${hue}`)

      // Añadir efecto 3D con transformZ
      corazon.style.transform = `translateZ(${Math.random() * 100}px)`

      contenedor.appendChild(corazon)
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 relative">
      <button
        onClick={onVolver}
        className="fixed top-4 left-4 z-50 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
        <span className="text-neon-rosa">100 Razones</span> Para Amarte Yalu
        <div className="text-xl md:text-2xl mt-2 text-pink-300">Feliz 5 meses, infinito amor ♾️</div>
      </h1>

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto transition-opacity duration-500 ${
          tarjetasVisibles ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Asegurarse de que solo se muestren exactamente 100 tarjetas */}
        {razones.slice(0, 100).map((razon, index) => (
          <TarjetaRazon
            key={index}
            numero={index + 1}
            razon={razon}
            abierta={tarjetasAbiertas.includes(index)}
            especial={index === 99 || index === 98} // Hacer especiales las tarjetas 99 y 100
            onAbrir={() => abrirTarjeta(index)}
            delay={index * 0.02}
          />
        ))}
      </div>

      {mostrarMensaje && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md p-6 rounded-xl max-w-md text-center animate-aparecer">
            <Heart className="w-8 h-8 text-neon-rosa mx-auto mb-3 animate-pulse" />
            <p className="text-white text-lg">{mensajeEspecial}</p>
          </div>
        </div>
      )}

      {/* Animación especial para el regalo 99 */}
      {animacionEspecial && (
        <div ref={animacionRef} className="fixed inset-0 bg-black z-50 overflow-hidden">
          <div className="animacion-destino">
            {/* Fondo de universo con estrellas */}
            <div className="fondo-universo">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  className="estrella-universo"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Pasto en movimiento */}
            <div className="pasto-contenedor">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="brizna-pasto"
                  style={{
                    left: `${i}%`,
                    height: `${Math.random() * 30 + 20}px`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    animationDelay: `${Math.random() * 1}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Siluetas de personas */}
            <div className="silueta-hombre"></div>
            <div className="silueta-mujer"></div>

            {/* Hilo del destino */}
            <div className="hilo-destino"></div>

            {/* Meteoritos */}
            <div className="meteorito meteorito-1"></div>
            <div className="meteorito meteorito-2"></div>

            {/* Explosión final */}
            <div className="explosion-final"></div>

            {/* Mensaje final */}
            <div className="mensaje-te-amo">Te Amo</div>
          </div>
        </div>
      )}

      <div id="explosion-corazones" className="fixed inset-0 z-30 pointer-events-none"></div>
    </div>
  )
}
