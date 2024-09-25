import React, { useState } from 'react';  
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/1.jpg'; // Importe a imagem de fundo

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      alert('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Registrar</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 text-gray-600 font-semibold">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
          >
            Registrar
          </button>
        </form>
        <p className="text-center mt-6 text-gray-500">
          Já tem uma conta?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Faça login aqui
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
