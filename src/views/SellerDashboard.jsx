import React, { useEffect, useState } from "react";

export default function SellerDashboard() {
  const [myProducts, setMyProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", stock: "" });
  const [currentSellerId, setCurrentSellerId] = useState(null); // 👈 Guardamos tu ID aquí

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        
        console.log("Payload completo del token en Dashboard:", payload);
        
        const sellerId = payload.id || payload.userId || payload.user_id;
        setCurrentSellerId(sellerId);
      } catch (error) {
        console.error("Error al decodificar token en Dashboard:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (!currentSellerId) return; 

    fetch("http://localhost:4002/products")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.content || [];
        
        const filtered = allProducts.filter((p) => {
          const productSellerId = p.seller?.id || p.sellerId || p.seller_id;
          return Number(productSellerId) === Number(currentSellerId);
        });

        setMyProducts(filtered);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [currentSellerId]); 

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés eliminar este producto?")) return;

    try {
      const res = await fetch(`http://localhost:4002/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        alert("Producto eliminado con éxito.");
        setMyProducts(myProducts.filter((p) => p.id !== id));
      } else {
        alert("No tenés permisos para eliminar este producto.");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4002/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const updatedProduct = await res.json();
        alert("¡Producto actualizado exitosamente!");
        
        setMyProducts(myProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
        setEditingProduct(null);
      } else {
        alert("Hubo un error al actualizar el producto.");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-black uppercase text-foreground mb-6">Mis productos pblicados </h1>

      {editingProduct && (
        <div className="mb-8 p-6 border border-border bg-card rounded-xl max-w-lg">
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
                <tr key={product.id} className="border-b border-border text-sm hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-mono text-muted-foreground">{product.id}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.stock} u.</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded font-medium text-xs hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-1.5 rounded font-medium text-xs hover:bg-red-700"
                    >
                      Eliminar
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