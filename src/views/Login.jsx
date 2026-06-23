import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldUser } from "lucide-react";
import { ClimbingBoxLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/cartSlice";
import { loginUser } from "../redux/loginSlice";
import { fetchFavorites } from "../redux/favoritesSlice"; 

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Consumimos el estado global de Redux
  const { loading, error} = useSelector((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(userData));

    if (loginUser.fulfilled.match(result)) {
      const data = result.payload;

      const token = data.access_token;

      if (!token) {
        alert("No se recibió token");
        return;
      }

      const decoded = jwtDecode(token);

      console.log("DECODED TOKEN:", decoded);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", decoded.userId);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", decoded.sub || decoded.username);

      dispatch(fetchCart(decoded.userId));
      dispatch(fetchFavorites());

      if (data.role?.toUpperCase().includes("SELLER")) {
        navigate("/my-products");
      } else {
        navigate("/");
      }
    }

    if (loginUser.rejected.match(result)) {
      alert(error || "Login incorrecto");
    }
};

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md border border-border bg-card rounded-lg shadow-xl overflow-hidden">

        <div className="p-6 text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Bienvenido de Vuelta!</h1>
          <p className="text-muted-foreground text-sm">
            Ingresa con tu cuenta <span className="text-primary font-bold">POWERFIT</span>

          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">

          {/* username */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Usuario</label>
            <div className="relative">
              <ShieldUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="username"
                type="text"
                required
                value={username}
                onChange={handleChange}
                disabled={loading}
                className="w-full h-10 rounded-md border bg-secondary px-10 text-sm"
                placeholder="Tu Usuario"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handleChange}
                disabled={loading}
                className="w-full h-10 rounded-md border bg-secondary px-10 text-sm"
                placeholder="Tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-muted-foreground"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-primary text-white rounded-md font-bold"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            ¿Aún no tenes una cuenta?{" "}
            <Link to="/register" className="text-primary">
              Registrate
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}