import React from 'react';
import '../Admin/Admin.css';
import { Link, useNavigate } from 'react-router-dom';

const SystemManagement = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const services = [
    { title: "Membership Type Management", icon: "📋", color: "#f95959" },
    { title: "Income-Management", icon: "📈", color: "#2ec4b6" },
    { title: "QR-Code", icon: "🔳", color: "#f4a261" },

  ];

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo-wrapper">
          <div className="logo-circle">PT</div>
          <span className="logo-text">Pulse Fitness</span>
          <span className="logo-arrow">»</span>
          <span
                        className="logo-sub-text-button"
                        onClick={() => navigate('/dashboard')}
                      >
                        Admin Panel
                      </span>
        </div>

        <div className="header-right">
 <div className="project-stats">

          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="services">
        <h3>System Management</h3>
        <div className="service-grid">
          {services.map((service, index) => (
            <Link
              key={index}
              to={`/service/${encodeURIComponent(service.title.toLowerCase().replace(/ /g, "-"))}`}
              className="service-card-link"
            >
              <div
                className="service-card"
                style={{ backgroundColor: service.color }}
              >
                <div className="icon">{service.icon}</div>
                <h4>{service.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SystemManagement;
