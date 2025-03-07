import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchIncidents = async () => {
    try {
      const res = await API.get('/incidents');
      setIncidents(res.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching incidents.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await API.delete(`/incidents/${id}`);
        setIncidents(incidents.filter(incident => incident.id !== id));
      } catch (err) {
        alert('Error deleting incident.');
      }
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Incident List</h2>
      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Severity</th>
              <th>Bank</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>
                  <Link to={`/incidents/${incident.id}`}>{incident.title}</Link>
                </td>
                <td>{incident.severity}</td>
                <td>{incident.bank}</td>
                <td>{new Date(incident.date).toLocaleString()}</td>
                <td>
                  <Link className="btn btn-sm btn-warning me-2" to={`/edit/${incident.id}`}>Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(incident.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncidentList;
