// src/components/LoginForm.jsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ onSubmit }) => {
  // Estados para los valores de los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para mostrar los errores
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Validaciones
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato estándar de email
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5; // Mínimo de 5 caracteres
  };

  // Manejador de cambios de los inputs
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError(
        "Por favor ingrese un email válido (ej: usuario@dominio.com)"
      );
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError("La contraseña debe tener al menos 5 caracteres");
    } else {
      setPasswordError("");
    }
  };

  // Manejador para mostrar/ocultar la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError && email && password) {
      onSubmit({ email, password });
    } else {
      if (!email) setEmailError("El campo de email no puede estar vacío");
      if (!password)
        setPasswordError("El campo de contraseña no puede estar vacío");
    }
  };

  return (
    <form
      className="w-full max-w-sm mx-auto p-6 bg-white shadow-md rounded"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold mb-10">Pedidos mayoristas</h1>
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

      {/* Campo de Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
            emailError ? "border-red-500" : "border-grey-900"
          }`}
        />
        {emailError && (
          <p className="text-red-500 text-xs italic">{emailError}</p>
        )}
      </div>

      {/* Campo de Contraseña */}
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
            passwordError ? "border-red-500" : "border-grey-900"
          }`}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={toggleShowPassword}
          className="absolute bottom-3 right-3 cursor-pointer text-gray-500"
        />
        {passwordError && (
          <p className="text-red-500 text-xs italic">{passwordError}</p>
        )}
      </div>

      {/* Botón de Enviar */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
