export const validateField = (name, value, formData) => {
  switch (name) {
    case "firstName":
      if (!value.trim()) return "El nombre es obligatorio";

      if (value.length < 2)
        return "Debe tener al menos 2 caracteres";

      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value))
        return "El nombre solo puede contener letras";

      return "";

    case "lastName":
      if (!value.trim()) return "El apellido es obligatorio";

      if (value.length < 2)
        return "Debe tener al menos 2 caracteres";

      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value))
        return "El apellido solo puede contener letras";

      return "";

    case "username":
      if (!value.trim()) return "Ingrese un usuario";
      if (value.length < 4) return "Mínimo 4 caracteres";
      if (!/^[a-zA-Z0-9_]+$/.test(value))
        return "Solo letras, números y _";
      return "";

    case "email":
      if (!value.trim()) return "Ingrese un email";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value))
        return "Email inválido";

      return "";

    case "password":
      if (!value) return "Ingrese una contraseña";

      if (value.length < 8)
        return "Mínimo 8 caracteres";

      if (!/[A-Z]/.test(value))
        return "Debe contener una mayúscula";

      if (!/[a-z]/.test(value))
        return "Debe contener una minúscula";

      if (!/[0-9]/.test(value))
        return "Debe contener un número";

      return "";

    case "confirmPassword":
      if (!value)
        return "Confirme la contraseña";

      if (value !== formData.password)
        return "Las contraseñas no coinciden";

      return "";

    default:
      return "";
  }
};