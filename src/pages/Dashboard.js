import React, { useEffect, useState } from 'react'; 
import api from '../services/api';
import backgroundImage from '../assets/2.jpg'; // Importa a imagem corretamente

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events'); // Rota correta para listar eventos
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', { title, description, date }); // Rota correta para criar evento
      alert('Evento criado com sucesso!');
      setTitle('');
      setDescription('');
      setDate('');
      // Atualiza a lista de eventos
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Uso da variável de imagem importada
    >
      {/* Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-white">Gerenciamento de Eventos</h1>

        {/* Formulário para criar novo evento */}
        <form 
          onSubmit={handleCreateEvent} 
          className="bg-white p-8 rounded-2xl shadow-lg mb-10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Criar Novo Evento</h2>
          <input
            type="text"
            placeholder="Título do Evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            placeholder="Descrição do Evento"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-4 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
          >
            Criar Evento
          </button>
        </form>

        {/* Listagem de eventos */}
        <h3 className="text-xl font-semibold mb-4 text-white">Eventos Criados</h3>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-gray-500">
                {new Date(event.date).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
