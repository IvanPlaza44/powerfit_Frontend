import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "../views/CardList";
import { useDispatch, useSelector } from "react-redux"; 
import { addFavoriteAsync } from "../redux/favoritesSlice";
import { fetchProducts } from "../redux/productSlice";

const Products = ({addToCart }) => {
  const [searchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search");

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let filteredProducts = [...products];

  // filtro por categoría
  if (currentCategory) {
    filteredProducts = filteredProducts.filter((p) => {
      const productCat = p.category?.description
        ? String(p.category.description).toLowerCase()
        : "";

      const searchCat = currentCategory
        ? String(currentCategory).toLowerCase()
        : "";

      return (
        productCat.includes(searchCat) ||
        searchCat.includes(productCat)
      );
    });
  }

  // búsqueda
  if (currentSearch) {
    const query = currentSearch.toLowerCase();

    filteredProducts = filteredProducts.filter((p) => {
      const name = p.name ? p.name.toLowerCase() : "";
      const description = p.description
        ? p.description.toLowerCase()
        : "";

      return (
        name.includes(query) ||
        description.includes(query)
      );
    });
  }

  // ordenar por precio
  if (sortOrder === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const finalPriceA =
        a.discount > 0
          ? a.price - (a.price * a.discount) / 100
          : a.price;

      const finalPriceB =
        b.discount > 0
          ? b.price - (b.price * b.discount) / 100
          : b.price;

      return finalPriceA - finalPriceB;
    });
  }

  if (sortOrder === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const finalPriceA =
        a.discount > 0
          ? a.price - (a.price * a.discount) / 100
          : a.price;

      const finalPriceB =
        b.discount > 0
          ? b.price - (b.price * b.discount) / 100
          : b.price;

      return finalPriceB - finalPriceA;
    });
  }

  const categoryImages = {
    indumentaria:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",

    suplementos:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1000&auto=format&fit=crop",

    equipamiento:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
  };


    const handleAddToFavorites = (product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role")?.toUpperCase() || "";

    if (!token || !userId || userId === "undefined") {
      alert("Tenés que iniciar sesión para guardar favoritos.");
      return;
    }

    if (role.includes("SELLER")) {
      alert("Los perfiles de vendedor no pueden gestionar listas de favoritos.");
      return;
    }

    // Validamos si ya existe en el estado global de Redux
    const exists = favorites.some((fav) => fav.product?.id === product.id);
    if (exists) {
      alert("Este producto ya está en tus favoritos.");
      return;
    }

    // Despachamos el thunk enviando el producto entero
    dispatch(addFavoriteAsync(product));
  };

  const bannerImage = currentCategory
    ? categoryImages[currentCategory]
    : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop";

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-2xl font-bold">
          Cargando productos...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-2xl font-bold text-red-500">
          Error: {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden mb-8 flex items-center p-8 md:p-12 border border-border">

        <img
          src={bannerImage}
          alt={currentCategory || "Todos los productos"}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.25]"
        />

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
            {currentSearch
              ? currentSearch
              : currentCategory || "Todos los productos"}
          </h1>
        </div>

      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Ordenar
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 border border-border p-4 rounded-xl bg-card">

          <label className="block mb-2 font-semibold">
            Ordenar por precio
          </label>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 rounded bg-background border border-border"
          >
            <option value="">
              Sin ordenar
            </option>

            <option value="asc">
              Menor a mayor
            </option>

            <option value="desc">
              Mayor a menor
            </option>
          </select>

        </div>
      )}

      <p className="mb-6 text-sm text-muted-foreground">
        Cantidad de productos: {filteredProducts.length}
      </p>

      {filteredProducts.length > 0 ? (
        <CardList
          products={filteredProducts}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
        />
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">

          <h2 className="text-xl font-semibold text-muted-foreground">
            No hay productos con esos filtros
          </h2>

        </div>
      )}

    </div>
  );
};

export default Products;