import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import IncidentList from './components/IncidentList';
import IncidentDetail from './components/IncidentDetail';
import IncidentForm from './components/IncidentForm';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<IncidentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/incidents/:id" element={<IncidentDetail />} />
          <Route path="/add" element={<IncidentForm />} />
          <Route path="/edit/:id" element={<IncidentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
