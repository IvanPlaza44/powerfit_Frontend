import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCheckout } from "../redux/checkoutSlice";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const checkout = useSelector((state) => state.checkout);
  const cartItems = useSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    cvv: "",
  });

  // Validaciones en tiempo real
  const isCardInvalid =
    paymentMethod === "card" &&
    (cardData.number.length !== 16 ||
      cardData.cvv.length !== 3 ||
      !cardData.name.trim());

  const isButtonDisabled = !paymentMethod || isCardInvalid;

  const cartTotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const finalTotal = cartTotal + checkout.shipping.cost;

  const handleCardChange = (e) => {
   
    if (e.target.name === "number" || e.target.name === "cvv") {
      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
      setCardData((prev) => ({ ...prev, [e.target.name]: onlyNums }));
      return;
    }

    setCardData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      setMessage("Seleccioná un método de pago.");
      setMessageType("error");
      return;
    }

    if (
      paymentMethod === "card" &&
      (
        cardData.number.length !== 16 ||
        cardData.cvv.length !== 3 ||
        !cardData.name.trim()
      )
    ) {
      setMessage("Completá correctamente los datos de la tarjeta.");
      setMessageType("error");
      return;
    }

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
        setMessage("Error al procesar la compra.");
        setMessageType("error")
        return;
      }

      dispatch(clearCart());
      dispatch(resetCheckout());

      setMessage("Pago realizado con éxito.");
      toast.success("Compra Realizada, te enviaremos detalles al mail", {
              toastId: "compra",
              })
      setMessageType("success");

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error(error);
      setMessage("Error de conexión.");
      setMessageType("error");
    }
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-black">Método de Pago</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded-xl font-medium ${
            messageType === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-sm">
        
        {/* EFECTIVO */}
        <div className="space-y-2">
          <button
            type="button"
            disabled={checkout.shipping.method !== "pickup"}
            onClick={() => setPaymentMethod("cash")}
            className={`w-full rounded-xl border p-4 text-left font-medium transition-all ${
              paymentMethod === "cash"
                ? "border-primary bg-primary/10 ring-2 ring-primary"
                : "border-border hover:bg-secondary/50"
            } ${
              checkout.shipping.method !== "pickup"
                ? "opacity-40 cursor-not-allowed"
                : ""
            }`}
          >
            Efectivo (al momento del retiro)
          </button>
          {checkout.shipping.method !== "pickup" && (
            <p className="text-xs text-red-500 pl-1">
              Disponible únicamente para retiro en sucursal.
            </p>
          )}
        </div>

        {/* TRANSFERENCIA */}
        <button
          type="button"
          onClick={() => {
            setPaymentMethod("transfer");
            setMessage(
              "Por mail recibirás los datos de contacto para realizar la transferencia."
            );
            setMessageType("success");
          }}
          className={`w-full rounded-xl border p-4 text-left ${
            paymentMethod === "transfer"
              ? "border-primary bg-primary/10"
              : ""
          }`}
        >
          Mercado Pago / Transferencia
        </button>

        {/* TARJETA */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`w-full rounded-xl border p-4 text-left font-medium transition-all ${
              paymentMethod === "card"
                ? "border-primary bg-primary/10 ring-2 ring-primary"
                : "border-border hover:bg-secondary/50"
            }`}
          >
            Tarjeta de Crédito / Débito
          </button>

          {paymentMethod === "card" && (
            <div className="space-y-4 rounded-xl border border-border p-4 bg-background">
              <div>
                <input
                  type="text"
                  name="number"
                  maxLength={16}
                  value={cardData.number}
                  onChange={handleCardChange}
                  placeholder="Número de tarjeta (16 dígitos)"
                  className="w-full rounded-xl border border-border p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {cardData.number && cardData.number.length !== 16 && (
                  <p className="text-xs text-red-500 mt-1 pl-1">Debe tener 16 números.</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  value={cardData.name}
                  onChange={handleCardChange}
                  placeholder="Nombre completo impreso en la tarjeta"
                  className="w-full rounded-xl border border-border p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="cvv"
                  maxLength={3}
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  placeholder="CVV (3 dígitos)"
                  className="w-full rounded-xl border border-border p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {cardData.cvv && cardData.cvv.length !== 3 && (
                  <p className="text-xs text-red-500 mt-1 pl-1">Debe tener 3 números.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RESUMEN */}
        <div className="rounded-xl bg-secondary p-4 space-y-1">
          <p className="text-sm">Subtotal: ${cartTotal}</p>
          <p className="text-sm">Envío: ${checkout.shipping.cost}</p>
          <hr className="my-2 border-border" />
          <p className="text-lg font-black">Total: ${finalTotal}</p>
        </div>

        {/* BOTÓN PRINCIPAL */}
        <button
          onClick={handlePayment}
          disabled={isButtonDisabled}
          className={`w-full rounded-xl py-4 font-bold transition-all ${
            isButtonDisabled
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
              : "bg-primary text-primary-foreground hover:opacity-90 shadow-md"
          }`}
        >
          Confirmar pago
        </button>
      </div>
    </div>
  );
};

export default Payment;