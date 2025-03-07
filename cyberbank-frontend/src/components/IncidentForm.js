import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

const IncidentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [bank, setBank] = useState('');
  const [error, setError] = useState('');

  const fetchIncident = async () => {
    try {
      const res = await API.get(`/incidents/${id}`);
      const data = res.data;
      setTitle(data.title);
      setDescription(data.description);
      setSeverity(data.severity);
      setBank(data.bank);
    } catch (err) {
      setError('Error fetching incident details.');
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchIncident();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incidentData = { title, description, severity, bank };
    try {
      if (isEdit) {
        await API.put(`/incidents/${id}`, incidentData);
      } else {
        await API.post('/incidents', incidentData);
      }
      navigate('/');
    } catch (err) {
      setError('Error saving incident.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2>{isEdit ? 'Edit Incident' : 'Add Incident'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" className="form-control" value={title}
              onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group mt-2">
            <label>Description:</label>
            <textarea className="form-control" rows="5" value={description}
              onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group mt-2">
            <label>Severity:</label>
            <select className="form-control" value={severity}
              onChange={(e) => setSeverity(e.target.value)} required>
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group mt-2">
            <label>Bank:</label>
            <input type="text" className="form-control" value={bank}
              onChange={(e) => setBank(e.target.value)} required />
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            {isEdit ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
