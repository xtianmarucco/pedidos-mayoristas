// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import supabase from '../supabaseClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;

    // Validar email
    if (!validateEmail(email)) {
      setEmailError('Formato de email inválido');
      valid = false;
    } else {
      setEmailError(null);
    }

    // Validar contraseña
    if (!password) {
      setPasswordError('La contraseña no puede estar vacía');
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (!valid) {
      return;
    }

    // Autenticar al usuario
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      setError('Correo electrónico o contraseña inválidos');
      return;
    }

    // Verificar el hash de la contraseña (aquí simplificado como comparación directa)
    if (user.password_hash !== password) {
      setError('Correo electrónico o contraseña inválidos');
      return;
    }

    // Despachar la acción de login
    dispatch(login(user));

    // Redirigir según el rol del usuario
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'customer') {
      navigate('/customer');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-10">Pedidos mayoristas</h1>
        <h3 className="text-2xl font-bold mb-10">ingresa</h3>
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 bg-cover  bg-no-repeat bg-center" style={{ backgroundImage: `url('/login-bkg.jpeg')` }}>
        {/* La imagen de fondo cubre toda el área */}
      </div>
    </div>
  );
};

export default LoginPage;
