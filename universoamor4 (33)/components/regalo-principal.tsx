"use client"

import { useState, useRef } from "react"
import { Heart } from "lucide-react"
import type React from "react"

interface RegaloPrincipalProps {
  onAbrir: () => void
}

export default function RegaloPrincipal({ onAbrir }: RegaloPrincipalProps) {
  const [abierto, setAbierto] = useState(false)
  const [particulas, setParticulas] = useState<JSX.Element[]>([])
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const regaloRef = useRef<HTMLDivElement>(null)

  // Efecto 3D al pasar el mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!abierto && isHovering && regaloRef.current) {
      const regalo = regaloRef.current.getBoundingClientRect()
      const centerX = regalo.left + regalo.width / 2
      const centerY = regalo.top + regalo.height / 2
      const posX = e.clientX - centerX
      const posY = e.clientY - centerY

      // Limitar la rotación a un máximo de 15 grados
      const rotateXValue = Math.min(Math.max((posY / (regalo.height / 2)) * -15, -15), 15)
      const rotateYValue = Math.min(Math.max((posX / (regalo.width / 2)) * 15, -15), 15)

      setRotateX(rotateXValue)
      setRotateY(rotateYValue)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
  }

  const handleClick = () => {
    if (abierto) return

    setAbierto(true)
    crearExplosionParticulas()

    setTimeout(() => {
      onAbrir()
    }, 1500)
  }

  const crearExplosionParticulas = () => {
    const nuevasParticulas: JSX.Element[] = []
    const numParticulas = 70 // Aumentado para más partículas

    for (let i = 0; i < numParticulas; i++) {
      const angulo = Math.random() * Math.PI * 2
      const distancia = 100 + Math.random() * 300
      const duracion = 0.8 + Math.random() * 1.5
      const tamaño = 10 + Math.random() * 40
      const delay = Math.random() * 0.5

      const x = Math.cos(angulo) * distancia
      const y = Math.sin(angulo) * distancia

      // Crear partículas con formas variadas (círculos, estrellas y corazones)
      const tipoParticula = Math.random() > 0.6 ? (Math.random() > 0.5 ? "corazon" : "estrella") : "circulo"
      const hue = Math.random() > 0.5 ? 340 + Math.random() * 40 : Math.random() * 360 // Más colores variados

      nuevasParticulas.push(
        <div
          key={i}
          className={`absolute ${tipoParticula === "corazon" ? "particula-corazon" : tipoParticula === "estrella" ? "particula-estrella" : "rounded-full"}`}
          style={
            {
              width: `${tamaño}px`,
              height: `${tamaño}px`,
              backgroundColor: tipoParticula === "circulo" ? `hsl(${hue}, 100%, 70%)` : "transparent",
              boxShadow: `0 0 20px hsl(${hue}, 100%, 70%)`,
              transform: "translate(-50%, -50%)",
              animation: `particula-explosion ${duracion}s ease-out forwards`,
              animationDelay: `${delay}s`,
              "--x": `${x}px`,
              "--y": `${y}px`,
              "--hue": `${hue}`,
              filter: `drop-shadow(0 0 10px hsl(${hue}, 100%, 70%))`,
            } as React.CSSProperties
          }
        />,
      )
    }

    setParticulas(nuevasParticulas)
  }

  // Estilo dinámico para la rotación 3D
  const regaloStyle = {
    transform: abierto
      ? "" // La clase abierto se encargará de la animación
      : isHovering
        ? `translateY(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        : "",
    transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
  }

  return (
    <div className="relative">
      <div
        ref={regaloRef}
        className={`regalo-principal cursor-pointer ${abierto ? "abierto" : ""}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={regaloStyle}
      >
        <div className="regalo-caja">
          <div className="regalo-sombra"></div>
          <div className="regalo-reflejo"></div>
        </div>
        <div className="regalo-tapa">
          <div className="regalo-tapa-reflejo"></div>
        </div>
        <div className="regalo-lazo-vertical"></div>
        <div className="regalo-lazo-horizontal"></div>
        <div className="regalo-lazo-nudo">
          <Heart className="w-8 h-8 text-white" fill="#ff2d75" />
        </div>

        <div className="regalo-destello"></div>

        <div className="regalo-mensaje">{abierto ? "♥" : "Ábrelo"}</div>
      </div>

      <div className="absolute top-1/2 left-1/2 z-20 pointer-events-none">{particulas}</div>
    </div>
  )
}
