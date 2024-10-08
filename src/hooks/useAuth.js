// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import supabase from '../supabaseClient'; // Asegúrate de tener configurado el cliente de Supabase
import { setUser, clearUser } from '../features/auth/authSlice';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Login con Supabase usando email y contraseña
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return null;
    }

    // Almacenar el usuario en Redux
    dispatch(setUser(data.user));
    return data.user;
  };

  // Función de logout
  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Limpiar el estado de usuario en Redux
      dispatch(clearUser());
    }
  };

  // Verificar la sesión existente
  const checkSession = () => {
    const session = supabase.auth.session();
    if (session) {
      dispatch(setUser(session.user));
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { login, logout, loading, error };
};

export default useAuth;
