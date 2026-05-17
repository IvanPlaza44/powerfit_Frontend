import React from "react";
import Card from "./Card";
import productsData from "../mocks/products";

export const Categories = ({ addToFavorites }) => {
  // 1. Mapeamos una imagen representativa para cada categoría existente
  const categoryImages = {
    indumentaria: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop", // Foto de ropa/Gym
    suplementos: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",  // Foto de botes/suplementos
    equipamiento: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"  // Foto de mancuernas/discos
  };

  // 2. Obtenemos las categorías únicas que existen actualmente en los productos
  const uniqueCategories = [...new Set(productsData.map((p) => p.category))];

  return (
    <div className="space-y-12 my-8">
      {uniqueCategories.map((category) => {
        // Filtramos los productos que pertenecen a ESTA categoría específica
        const categoryProducts = productsData.filter((p) => p.category === category);
        const bannerImage = categoryImages[category] || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop";

        return (
          <section key={category} className="border border-border rounded-2xl overflow-hidden bg-card/30 p-6">
            
            {/* Encabezado de la Categoría: Título + Imagen de fondo */}
            <div className="relative h-32 md:h-40 rounded-xl overflow-hidden mb-6 flex items-center p-6 md:p-10 group">
              {/* Imagen de fondo de la categoría */}
              <img 
                src={bannerImage} 
                alt={category} 
                className="absolute inset-0 w-full h-full object-cover brightness-35 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Título de la categoría */}
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-wider drop-shadow-md">
                  {category}
                </h2>
                <p className="text-xs text-primary font-semibold tracking-widest uppercase mt-1">
                  Explorar {categoryProducts.length} artículos
                </p>
              </div>
            </div>

            {/* Lista de productos de ESTA categoría (Grilla responsiva interna) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
              {categoryProducts.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  addToFavorites={addToFavorites}
                />
              ))}
            </div>

          </section>
        );
      })}
    </div>
  );
};