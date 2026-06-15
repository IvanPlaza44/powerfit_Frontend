import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setForm, setShipping, resetCheckout } from "../redux/checkoutSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkout = useSelector((state) => state.checkout);
  const cartItems = useSelector((state) => state.cart.items);

  const handleChange = (e) => {
    dispatch(setForm({ [e.target.name]: e.target.value }));
  };

  const cartTotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const finalTotal = cartTotal + checkout.shipping.cost;

  const isFormValid =
    checkout.form.fullName &&
    checkout.form.email &&
    checkout.form.address &&
    checkout.form.city;

  const handlePurchase = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch("http://localhost:4002/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(userId),
        }),
      });

      if (!res.ok) {
        alert("Error en la compra");
        return;
      }

      dispatch(resetCheckout());

      alert("Compra realizada con éxito");
      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Error de red");
    }
  };

  const shippingOptions = [
    { value: "pickup", label: "Retiro en sucursal", cost: 0 },
    { value: "motorbike", label: "Motomensajería", cost: 1500 },
    { value: "delivery", label: "Envío a domicilio", cost: 2500 },
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-black">
        Finalizar compra
      </h1>

      <form
        onSubmit={handlePurchase}
        className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-sm"
      >
        {/* FORM */}
        <input
          name="fullName"
          placeholder="Nombre completo"
          value={checkout.form.fullName}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="email"
          placeholder="Email"
          value={checkout.form.email}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="address"
          placeholder="Dirección"
          value={checkout.form.address}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="city"
          placeholder="Ciudad"
          value={checkout.form.city}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        {/* SHIPPING MEJORADO */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground">
            Método de envío
          </label>

          <div className="grid gap-3">
            {shippingOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() =>
                  dispatch(
                    setShipping({
                      method: opt.value,
                      cost: opt.cost,
                    })
                  )
                }
                className={`flex justify-between items-center rounded-xl border p-4 transition ${
                  checkout.shipping.method === opt.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                }`}
              >
                <span className="font-medium">{opt.label}</span>
                <span className="font-bold">
                  {opt.cost===0 ? "Gratis" : `$${opt.cost}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-secondary p-4 space-y-1">
          <p>Subtotal: ${cartTotal}</p>
          <p>Envío: ${checkout.shipping.cost}</p>

          <hr className="my-2" />

          <p className="text-lg font-black">
            Total: ${finalTotal}
          </p>
        </div>

        <button
          disabled={!isFormValid}
          type="submit"
          className="w-full rounded-xl bg-primary py-4 font-bold disabled:opacity-50"
        >
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;