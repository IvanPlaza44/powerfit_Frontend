import React, { useEffect, useState } from "react";
import Card from "./Card";

export const Categories = ({ addToFavorites }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:4002/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.content);
      })
      .catch((error) =>
        console.error("Error cargando productos:", error)
      );

  }, []);

  // imágenes por categoría
  const categoryImages = {
    indumentaria:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",

    suplementos:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",

    equipamiento:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
  };

  // categorías únicas
  const uniqueCategories = [
    ...new Set(
      products.map(
        (p) => p.category?.description
      )
    )
  ];

  return (
    <div className="space-y-12 my-8">

      {uniqueCategories.map((category) => {

        // productos de ESA categoría
        const categoryProducts =
          products.filter(
            (p) =>
              p.category?.description === category
          );

        const bannerImage =
          categoryImages[category] ||
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop";

        return (
          <section
            key={category}
            className="border border-border rounded-2xl overflow-hidden bg-card/30 p-6"
          >

            {/* Header */}
            <div className="relative h-32 md:h-40 rounded-xl overflow-hidden mb-6 flex items-center p-6 md:p-10 group">

              <img
                src={bannerImage}
                alt={category}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.35] transition-transform duration-500 group-hover:scale-105"
              />

              <div className="relative z-10">

                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-md">
                  {category}
                </h2>

                <p className="text-xs text-primary font-semibold tracking-widest uppercase mt-1">
                  Explorar {categoryProducts.length} artículos
                </p>

              </div>
            </div>

            {/* Productos */}
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