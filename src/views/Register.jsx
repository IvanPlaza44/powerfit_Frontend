import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // <-- Agregado useNavigate

export default function Register() {
  // HOOKS
  const navigate = useNavigate(); // <-- Inicializado para poder redireccionar

  // STATES
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <-- Agregado el estado que faltaba

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "" 
  });

  // URL BACKEND
  const URL = "http://localhost:4002/auth";

  // HANDLERS
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica antes de enviar al back
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    const { confirmPassword, ...registerData } = formData;

    fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData), 
    }) 
    .then((response) => {
      const isOk = response.ok;
      
      return response.json().then((data) => {
        return { isOk, data };
      });
    })
    .then(({ isOk, data }) => {
      if (isOk) {
        console.log("Registro exitoso:", data);
        navigate("/home");
      } else {
        alert(data.message || "Error en el registro de credenciales");
      }
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      alert("Hubo un problema de conexión con el servidor.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-neutral-800 rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-neutral-400 text-sm">
            Join <span className="text-green-500 font-bold">POWERFIT</span> and start your fitness journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Jon"
              value={formData.firstName} 
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-white">
              Lastname
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Perez"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Username (Surname) */}
          <div className="space-y-2">
            <label htmlFor="userName" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="JonPerez99"
              value={formData.userName}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 transition-colors pr-12 disabled:opacity-50"
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

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 transition-colors pr-12 disabled:opacity-50"
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
            disabled={isLoading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-neutral-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:text-green-400 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}