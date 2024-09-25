import React, { useState } from 'react'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // Importação corrigida

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate(); // Alteração para useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', { title, description, date });
      navigate('/dashboard'); // Alteração para usar navigate
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-5">Criar Evento</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Criar Evento
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
