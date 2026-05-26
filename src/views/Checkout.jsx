import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    paymentMethod: "Tarjeta"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePurchase = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {

      const res = await fetch(
        "http://localhost:4002/purchase",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            userId: Number(userId)
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.log(errorText);
        alert(errorText);
        return;
        }
      const data = await res.json();

      console.log("PURCHASE =>", data);

      alert("Compra realizada con éxito");

      navigate("/products");

    } catch (error) {
      console.error(error);
      alert("Error de red");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">

      <h1 className="mb-8 text-4xl font-black">
        Finalizar compra
      </h1>

      <form
        onSubmit={handlePurchase}
        className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-sm"
      >

        <input
          type="text"
          name="fullName"
          placeholder="Nombre completo"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-secondary p-4 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-secondary p-4 outline-none"
        />

        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-secondary p-4 outline-none"
        />

        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-secondary p-4 outline-none"
        />

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-secondary p-4 outline-none"
        >
          <option>Tarjeta</option>
          <option>Transferencia</option>
          <option>Efectivo</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground transition hover:scale-[1.02]"
        >
          Confirmar compra
        </button>

      </form>
    </div>
  );
};

export default Checkout;