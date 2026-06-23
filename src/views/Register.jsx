import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { jwtDecode } from "jwt-decode";
import { registerUser } from "../redux/registerSlice";
import { loginUser } from "../redux/loginSlice";
import { fetchCart } from "../redux/cartSlice";
import { validateField } from "../utils/validateRegister";
import { toast }from "react-toastify";

export default function Register() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  // Consumimos el estado global de Redux
  const { loading, error } = useSelector((state) => state.register);

  // STATES LOCALES DE CONTROL VISUAL
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "" 
  });

  //////////////////////////////////////////////

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Filtro inmediato para evitar caracteres extraños en nombres/apellidos
    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    }

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);

    // Creamos la mutación de errores de forma limpia
    setErrors((prev) => {
      const nextErrors = {
        ...prev,
        [name]: validateField(name, value, updatedForm),
      };

      // Si cambia la contraseña principal, re-validamos automáticamente la confirmación
      if (name === "password" && updatedForm.confirmPassword) {
        nextErrors.confirmPassword = validateField(
          "confirmPassword",
          updatedForm.confirmPassword,
          updatedForm
        );
      }

      return nextErrors;
    });
  };

  //////////////////////////////////////////////
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(
        field,
        formData[field],
        formData
      );
    });

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  //////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    const result = await dispatch(registerUser(registerData));

    if (registerUser.fulfilled.match(result)) {
      const loginResult = await dispatch(
        loginUser({ username: registerData.username, password: registerData.password })
      );

      if (loginUser.fulfilled.match(loginResult)) {
        const data = loginResult.payload;
        const token = data.access_token;

        if (!token) {
          toast.info("Cuenta creada, pero no se recibió token de inicio de sesión", {
            toastId: "token-error",
          });
          navigate("/");
          return;
        }

        const decoded = jwtDecode(token);

        localStorage.setItem("token", token);
        localStorage.setItem("userId", decoded.userId);
        localStorage.setItem("role", data.role);

        navigate("/");
        return;
      }
      toast.info("Cuenta creada, pero no se pudo iniciar sesión automáticamente", {
            toastId: "log-error",
        });
      navigate("/login");
      return;
    }

    if (registerUser.rejected.match(result)) {
      toast.error("No se pudo registrar el usuario.", {
            toastId: "register-error",
        });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-neutral-800 rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Crea tu cuenta</h1>
          <p className="text-neutral-400 text-sm">
            Únete a <span className="text-green-500 font-bold">POWERFIT</span> y empieza una vida fitness
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div className="space-y-2">
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
            <label htmlFor="firstName" className="block text-sm font-medium text-white">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Jon"
              value={formData.firstName} 
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-3 bg-neutral-900 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition-colors disabled:opacity-50 ${
                errors.firstName
                  ? "border border-red-500"
                  : "border border-neutral-800 focus:border-green-500"
              }`}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
            <label htmlFor="lastName" className="block text-sm font-medium text-white">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Perez"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-3 bg-neutral-900 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition-colors disabled:opacity-50 ${
                errors.lastName
                  ? "border border-red-500"
                  : "border border-neutral-800 focus:border-green-500"
              }`}
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
            <label htmlFor="username" className="block text-sm font-medium text-white">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="JonPerez99"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-3 bg-neutral-900 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition-colors disabled:opacity-50 ${
                errors.username
                  ? "border border-red-500"
                  : "border border-neutral-800 focus:border-green-500"
              }`}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <label htmlFor="email" className="block text-sm font-medium text-white">Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tucorreo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-3 bg-neutral-900 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition-colors disabled:opacity-50 ${
                errors.email
                  ? "border border-red-500"
                  : "border border-neutral-800 focus:border-green-500"
              }`}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <label htmlFor="password" className="block text-sm font-medium text-white">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Crea una contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-3 bg-neutral-900 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition-colors disabled:opacity-50 ${
                  errors.password
                    ? "border border-red-500"
                    : "border border-neutral-800 focus:border-green-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            {/* CORREGIDO: Ahora mira errors.confirmPassword */}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirma tu contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-3 bg-neutral-900 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition-colors disabled:opacity-50 ${
                  errors.confirmPassword
                    ? "border border-red-500"
                    : "border border-neutral-800 focus:border-green-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-neutral-400 text-sm mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-green-500 hover:text-green-400 transition-colors">
            Ingresa aquí
          </Link>
        </p>
      </div>
    </div>
  );
}