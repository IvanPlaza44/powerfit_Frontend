import React from 'react'
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
        <div className="container mx-auto px-4 py-20 md:py-15">
          <div className="grid items-center md:grid-cols-2">
            <div className="space-y-5">
              <h1 className="text-7xl font-bold leading-tight tracking-tight md:text-7xl">
                Potenciá Tu
                <span className="block text-primary">Entrenamiento</span>
              </h1>

              <p className="max-w-md text-lg text-muted-foreground">
                Equipamiento fitness, suplementos y ropa deportiva de primera calidad 
                para llevar tu entrenamiento al próximo nivel. Entrená más fuerte, recuperate más rápido y rendí al máximo.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <button className="gap-2 rounded-md p-2 flex items-center bg-primary text-black transition-transform hover:scale-105">
                    Comprar Ahora <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                <Link to="/products?category=equipamiento">
                  <button className="gap-2 rounded-md p-2 flex items-center transition-transform hover:scale-105">
                    Ver Equipamiento 
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
                alt="Equipamiento fitness"
                className="rounded-2xl object-cover"
              />

              <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-lg">
                <p className="text-sm text-muted-foreground">Nuevos Ingresos</p>
                <p className="text-2xl font-bold text-primary">25% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero