import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash2, FiMail } from 'react-icons/fi';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  content: string;
  createdAt: string;
}

const API_URL = 'http://localhost:4000/api';

const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Liste des messages */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Messages ({messages.length})</h2>
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Aucun message</p>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                  selectedMessage?._id === msg._id ? 'bg-blue-50 border-blue-300' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{msg.name}</p>
                    <p className="text-xs text-gray-600 truncate">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-xs text-gray-700 truncate mt-1">{msg.subject}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{formatDate(msg.createdAt)}</p>
                  </div>
                  <FiMail className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Détail du message */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        {!selectedMessage ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <FiMail className="w-16 h-16 mb-4" />
            <p>Sélectionnez un message pour le lire</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedMessage.subject || 'Sans sujet'}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">{selectedMessage.name}</span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                  <span className="text-gray-400">
                    {formatDate(selectedMessage.createdAt)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="text-red-600 hover:text-red-800 p-2"
                title="Supprimer"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t pt-6">
              <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                {selectedMessage.content}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Votre message'}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Répondre par email
              </a>
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
