import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg'; // Importe a imagem de fundo

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }} // Define o background com a imagem
    >
      <h1 className="text-3xl font-bold mb-5 text-white">Bem-vindo ao Evento App!</h1>
      <p className="mb-5 text-white">Aqui você pode criar e gerenciar seus eventos.</p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Home;
