// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Reemplaza con tu URL de Supabase
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Reemplaza con tu anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;