import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

const IncidentDetail = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await API.get(`/incidents/${id}`);
        setIncident(res.data);
      } catch (err) {
        setError('Ошибка при загрузке деталей инцидента.');
      } finally {
        setLoading(false);
      }
    };
    fetchIncident();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!incident) return <div>Инцидент не найден.</div>;

  // Функция для безопасного рендеринга текста с форматированием
  const formatText = (text) => {
    return text.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  return (
    <div>
      <h2>{incident.title}</h2>
      <p><strong>Серьезность:</strong> {incident.severity}</p>
      <p><strong>Банк:</strong> {incident.bank}</p>
      <p><strong>Дата:</strong> {new Date(incident.date).toLocaleString()}</p>
      <hr />
      <h4>Описание:</h4>
      {formatText(incident.description)}
      <Link className="btn btn-secondary mt-3" to="/">Назад к списку</Link>
    </div>
  );
};

export default IncidentDetail;
