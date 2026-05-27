import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "", // Vincula el producto a una categoría por su ID
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autenticado. Por favor, iniciá sesión.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4002/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pasa el token para que Java sepa quién es el vendedor
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          categoryId: parseInt(formData.categoryId), // Ajustar según lo que pida ProductRequest
        }),
      });

      if (res.ok) {
        alert("¡Producto publicado con éxito! ");
        navigate("/products"); // Redirige al catálogo
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Error al publicar: ${errorData.message || "Verificá los datos o tu rol de vendedor"}`);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Hubo un problema de red al intentar publicar el producto.");
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-black uppercase text-foreground">
          Publicar Nuevo Producto 🏋️‍♂️
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
              placeholder="Ej: Remera PowerFit Black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
              placeholder="Detalles del producto, materiales, talle..."
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Precio ($)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock Inicial</label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ID de Categoría</label>
            <select
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
            >
              <option value="">Selecciona una categoría</option>
              <option value="1">1 - Indumentaria</option>
              <option value="2">2 - Suplementos</option>
              <option value="3">3 - Equipamiento</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
          >
            Publicar Producto
          </button>
        </form>
      </div>
    </div>
  );
}