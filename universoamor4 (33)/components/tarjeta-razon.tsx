"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Heart, Star } from "lucide-react"

interface TarjetaRazonProps {
  numero: number
  razon: string
  abierta: boolean
  especial: boolean
  onAbrir: () => void
  delay: number
}

export default function TarjetaRazon({ numero, razon, abierta, especial, onAbrir, delay }: TarjetaRazonProps) {
  const [animando, setAnimando] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const tarjetaRef = useRef<HTMLDivElement>(null)

  // Efecto 3D al pasar el mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!abierta && !animando && isHovering && tarjetaRef.current) {
      const card = tarjetaRef.current.getBoundingClientRect()
      const centerX = card.left + card.width / 2
      const centerY = card.top + card.height / 2
      const posX = e.clientX - centerX
      const posY = e.clientY - centerY

      // Aumentar el efecto 3D con rotación más pronunciada
      const rotateXValue = Math.min(Math.max((posY / (card.height / 2)) * -15, -15), 15)
      const rotateYValue = Math.min(Math.max((posX / (card.width / 2)) * 15, -15), 15)

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
    if (abierta || animando) return

    setAnimando(true)
    onAbrir()

    // Resetear el estado de animación después de que termine
    setTimeout(() => {
      setAnimando(false)
    }, 1000)
  }

  // Añadir efecto de brillo aleatorio para las tarjetas especiales
  useEffect(() => {
    if (especial && tarjetaRef.current) {
      const interval = setInterval(() => {
        if (tarjetaRef.current && !abierta) {
          const hue = Math.floor(Math.random() * 60)
          tarjetaRef.current.style.setProperty("--random-hue", `${hue}deg`)
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [especial, abierta])

  // Estilo dinámico para la rotación 3D
  const cardStyle = {
    transform: abierta
      ? "rotateY(180deg)"
      : animando
        ? "" // La clase animando se encargará de la animación
        : isHovering
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
    transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
  }

  return (
    <div className="tarjeta-razon-container" style={{ animationDelay: `${delay}s` }}>
      <div
        ref={tarjetaRef}
        className={`tarjeta-razon cursor-pointer ${abierta ? "abierta" : ""} ${animando ? "animando" : ""} ${
          especial ? "especial" : ""
        }`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={cardStyle}
      >
        <div className="tarjeta-frente">
          <div className="tarjeta-lazo"></div>
          <div className="tarjeta-cinta-vertical"></div>
          <div className="tarjeta-cinta-horizontal"></div>
          <div className="tarjeta-nudo"></div>
          <div className="tarjeta-numero">{numero}</div>
          {especial && <div className="tarjeta-brillo"></div>}
          {especial && <div className="tarjeta-destello"></div>}
          {especial && <div className="tarjeta-corona"></div>}
          {numero === 100 && (
            <div className="tarjeta-estrella-especial" style={{ filter: "drop-shadow(0 0 15px gold)" }}></div>
          )}
          {numero === 99 && <div className="tarjeta-estrella-especial"></div>}
        </div>
        <div className="tarjeta-dorso">
          <p className="tarjeta-texto">{razon}</p>
          <Heart className="w-4 h-4 text-neon-rosa absolute bottom-2 right-2" fill="#ff2d75" />
          {especial && <Star className="w-4 h-4 text-yellow-400 absolute top-2 right-2" fill="#FFD700" />}
        </div>
      </div>
    </div>
  )
}
