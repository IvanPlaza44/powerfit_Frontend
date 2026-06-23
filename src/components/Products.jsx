import React, { useEffect, useState } from "react";
import CardList from "../views/CardList";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteAsync,
  removeFavoriteAsync,
  fetchFavorites,
} from "../redux/favoritesSlice";
import { fetchProducts } from "../redux/productSlice";
import { setSortOrder } from "../redux/filterSlice";
import { setCategory, setSearch } from "../redux/filterSlice";

const Products = () => {
  const dispatch = useDispatch();
  //const [message, setMessage] = useState("");
  //const [messageType, setMessageType] = useState("");

  const { category, search, sortOrder } = useSelector(
    (state) => state.filter
  );

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const { favorites,  loading: favoritesLoading, } = useSelector((state) => state.favorites);
  
  const categoryImages = {
    indumentaria:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    suplementos:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1600&auto=format&fit=crop",
    equipamiento:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
    todos:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
  };

useEffect(() => {

  if (products.length === 0) {
    dispatch(fetchProducts());
  }
  

}, [dispatch, products.length]);

  let filteredProducts = [...products];


  if (category) {
    filteredProducts = filteredProducts.filter((p) => {
      const productCat = p.category?.description?.toLowerCase() || "";
      const selected = category.toLowerCase();

      return productCat.includes(selected);
    });
  }


  if (search) {
    const q = search.toLowerCase();

    filteredProducts = filteredProducts.filter((p) =>
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  }

  const getFinalPrice = (p) =>
    p.discount > 0
      ? p.price - (p.price * p.discount) / 100
      : p.price;

  if (sortOrder === "asc") {
    filteredProducts.sort(
      (a, b) => getFinalPrice(a) - getFinalPrice(b)
    );
  }

  if (sortOrder === "desc") {
    filteredProducts.sort(
      (a, b) => getFinalPrice(b) - getFinalPrice(a)
    );
  }

  const handleAddToFavorites = async (product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role")?.toUpperCase() || "";

    if (!token || !userId || userId === "undefined") {
      alert("Tenés que iniciar sesión.");
      return;
    }

    if (role.includes("SELLER")) {
      alert("Los vendedores no pueden usar favoritos.");
      return;
    }

    const existing = favorites.find(
      (f) => f.product?.id === product.id
    );

    try {
      if (existing) {
        await dispatch(removeFavoriteAsync(existing.id)).unwrap();
      } else {
        await dispatch(addFavoriteAsync(product)).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

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

        {/* IMAGEN DE FONDO */}
          <img
            src={categoryImages[category?.toLowerCase()] || categoryImages.todos}
            alt={category}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          />
    

        {/* OVERLAY (para que el texto se lea bien) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* TEXTO */}
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
            {search ? search : category || "Todos los productos"}
          </h1>
        </div>
      </div>

      {/* FILTRO SORT */}
      <select
        value={sortOrder}
        onChange={(e) => dispatch(setSortOrder(e.target.value))}
        className="w-56 rounded-lg border border-border px-3 py-2 bg-card "
      >
        <option value="">Ordenar por precio</option>
        <option value="asc">↑ Menor a mayor</option>
        <option value="desc">↓ Mayor a menor</option>
      </select>

      <p className="m-6 text-sm text-muted-foreground">
        Cantidad de productos: {filteredProducts.length}
      </p>

      {/* LISTA */}
      {filteredProducts.length > 0 ? (
        <CardList
          products={filteredProducts}
          //addToFavorites={handleAddToFavorites}
          //setMessage={setMessage}
          //setMessageType={setMessageType}
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