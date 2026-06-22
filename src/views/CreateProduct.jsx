import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/sellerSlice";

export default function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "0",
    stock: "",
    categoryId: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const IMGBBB_API_KEY = "addff561790a76132ef3c2fbd7b280b3";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autenticado. Por favor, iniciá sesión.");
      return;
    }

    if (!imageFile) {
      alert("Por favor, seleccioná una imagen para el producto.");
      return;
    }

    setLoading(true);

    try {
      // SUBIR LA IMAGEN A IMGBB (servicio externo, se deja con fetch)
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBB_API_KEY}`, {
        method: "POST",
        body: imageData,
      });

      if (!imgbbRes.ok) {
        throw new Error("Error al subir la imagen al servidor externo.");
      }

      const imgbbData = await imgbbRes.json();
      const uploadedImageUrl = imgbbData.data.url;

      // CREAR EL PRODUCTO VÍA REDUX
      const result = await dispatch(createProduct({
        name: formData.name,
        description: formData.description,
        image: uploadedImageUrl,
        price: parseFloat(formData.price),
        discount: parseInt(formData.discount || 0, 10),
        stock: parseInt(formData.stock, 10),
        categoryId: parseInt(formData.categoryId, 10),
      }));

      if (createProduct.fulfilled.match(result)) {
        alert("¡Producto publicado con éxito!");
        navigate("/my-products");
      } else {
        alert(`Error al publicar: ${result.payload?.message || "Verificá tu rol de vendedor"}`);
      }
    } catch (error) {
      console.error("Error en el proceso:", error);
      alert(error.message || "Hubo un problema de red.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-12">
      <div className="rounded-xl border border-border bg-card p-6 shadow-md transition-all">
        
        <h2 className="mb-6 text-3xl font-black uppercase tracking-wide text-foreground text-center">
          Publicar <span className="text-primary">Nuevo Producto</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-muted-foreground">
              Nombre del Producto
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-all"
              placeholder="Ej: Proteína Whey Pure"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-muted-foreground">
              Descripción
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-all resize-none"
              placeholder="Detalles del producto..."
              rows="2"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-muted-foreground">
              Imagen del Producto
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-all file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-primary file:text-primary-foreground cursor-pointer"
            />
            
            {previewUrl && (
              <div className="mt-3 flex justify-center border border-border rounded-lg p-2 bg-background">
                <img
                  src={previewUrl}
                  alt="Previsualización"
                  className="max-h-40 rounded-md object-contain"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-muted-foreground">
                Precio ($)
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-all"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-muted-foreground">
                Descuento (%)
              </label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                value={formData.discount}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-muted-foreground">
                Stock Inicial
              </label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-all"
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-muted-foreground">
                Categoría
              </label>
              <select
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="" className="bg-card">Seleccionar</option>
                <option value="1" className="bg-card">Equipamiento</option>
                <option value="2" className="bg-card">Suplementos</option>
                <option value="3" className="bg-card">Indumentaria</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-black uppercase tracking-wider text-primary-foreground hover:scale-[1.02] active:scale-100 transition-all cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Subiendo imagen y publicando..." : "Publicar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
}