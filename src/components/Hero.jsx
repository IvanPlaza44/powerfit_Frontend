import React from 'react'
import { Link } from "react-router-dom"
import { ArrowRight, Dumbbell, Pill, Shirt } from "lucide-react"


const Hero = () => {
  return (
    <div>
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Power Your
                <span className="block text-primary">Fitness Journey</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Premium fitness equipment, supplements, and apparel to help you achieve your goals. 
                Train harder, recover faster, perform better.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <button size="lg" className="gap-2 rounded-md p-2 flex items-center bg-green-200 text-gray-600 transition-transform hover:bg-green-300">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to="/products?category=equipamiento">
                  <button className='flex items-center p-2 hover:'>
                    View Equipment
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
                alt="Fitness equipment"
                fill
                className="rounded-2xl object-cover"
                priority
              />
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-lg">
                <p className="text-sm text-muted-foreground">New Arrivals</p>
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