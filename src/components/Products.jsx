import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "../views/CardList";
import productsData from "../mocks/products";

// NUEVO: Agregamos "addToCart" en las props que recibe el componente
const Products = ({ addToFavorites, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get("category");

  const categoryImages = {
    indumentaria: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",
    suplementos: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1000&auto=format&fit=crop",
    equipamiento: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
  };

  useEffect(() => {
    if (!currentCategory) {
      setProducts(productsData);
      return;
    }

    const filteredProducts = productsData.filter(
      (product) => product.category === currentCategory
    );

    setProducts(filteredProducts);
  }, [searchParams, currentCategory]);

  const bannerImage = currentCategory 
    ? categoryImages[currentCategory] 
    : "https://images.unsplash.com/photo-1517838483737-3015b90bb58e?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Banner dinámico */}
      <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden mb-8 flex items-center p-8 md:p-12 border border-border">
        <img 
          src={bannerImage} 
          alt={currentCategory || "Todos los productos"} 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.25]"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-wider drop-shadow-md">
            {currentCategory ? currentCategory : "Todos los productos"}
          </h1>
          <p className="text-xs text-primary font-semibold tracking-widest uppercase mt-1">
            POWERFIT Premium Gear
          </p>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Cantidad de productos: {products.length}
      </p>

      {products.length > 0 ? (
        <CardList
          products={products}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
        />
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <h2 className="text-xl font-semibold text-muted-foreground">
            No hay productos en esta categoría
          </h2>
        </div>
      )}
    </div>
  );
};

export default Products;