import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  fetchMyProducts,
  deleteProduct,
  updateProduct
} from "../redux/sellerSlice";

export default function SellerDashboard() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const { products: myProducts, loading } = useSelector(
    (state) => state.seller
  );

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", stock: "", discount: 0 , image: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleToggleActive = async (product) => {
    const action = product.active ? "inactivar" : "activar";

    if (!window.confirm(`¿Querés ${action} este producto?`)) return;

    const result = await dispatch(
      updateProduct({
        id: product.id,
        productData: {
          ...product,
          active: !product.active,
        },
      })
    );

    if (updateProduct.fulfilled.match(result)) {
      setMessage(`Producto ${action === "inactivar" ? "inactivado" : "activado"} con éxito.`);
      setMessageType("success");
      dispatch(fetchMyProducts());
    } else {
      setMessage(result.payload || `Error al ${action} el producto.`);
      setMessageType("error");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      discount: product.discount || 0, 
      image: product.image || ""
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 0);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateProduct({
        id: editingProduct.id,
        productData: formData,
      })
    );

    if (updateProduct.fulfilled.match(result)) {
      setMessage("Producto actualizado exitosamente.");
      setMessageType("success");
      dispatch(fetchMyProducts());

      setEditingProduct(null);
    } else {
      setMessage(result.payload || "Error al actualizar el producto.");
      setMessageType("error");
}
  };

  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-black uppercase text-foreground mb-6">Mis productos publicados </h1>
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}
      {editingProduct && (
        <div 
        ref={formRef}
        className="mb-8 p-6 border border-border bg-card rounded-xl max-w-lg">
          <h2 className="text-xl font-bold mb-4">Editar Producto: {editingProduct.name}</h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-3">
            <input
              type="text"
              className="p-2 border border-border bg-background rounded"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <textarea
              className="p-2 border border-border bg-background rounded"
              placeholder="Descripcion"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                className="p-2 border border-border bg-background rounded"
                placeholder="Precio"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
              <input
                type="number"
                className="p-2 border border-border bg-background rounded"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                required
              />
              {/* */}
              <input
                type="number"
                min="0"
                max="100"
                className="p-2 border border-border bg-background rounded col-span-2"
                placeholder="Descuento (%) - ej 20 para 20%"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700">Guardar Cambios</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded font-bold hover:bg-gray-600">Cancelar</button>
            </div>
          </form>
        </div>
      )} 
      

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-sm font-semibold">
              <th className="p-4">ID</th>
              <th className="p-4">Producto</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.length > 0 ? (
              myProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`border-b text-sm transition-colors ${
                  !product.active
                    ? "bg-white/60 text-black/40 opacity-70"
                    : "hover:bg-muted/20"               
                  }`}
                >
                <td className="p-4 font-mono text-muted-foreground">{product.id}</td>                  
                <td className={`p-4 font-medium ${!product.active ? "opacity-50" : ""}`}>
                  {product.name}
                </td>
                <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.stock} u.</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="bg-green-600 text-white px-3 py-1.5 rounded font-medium text-xs hover:bg-green-700"                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleToggleActive(product)}
                      className="bg-red-600 text-white px-3 py-1.5 rounded font-medium text-xs hover:bg-red-700"
                    >
                      {product.active ? "Inactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-muted-foreground font-medium">
                  Aun no tenés productos publicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}