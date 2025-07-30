import React from 'react';
import './Admin.css';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear auth tokens from localStorage/sessionStorage
    // localStorage.removeItem("token");
    navigate('/'); // Redirect to home or login page
  };

  const services = [
    { title: "Registration", icon: "📝", color: "#f95959" },
    { title: "Payment", icon: "💳", color: "#56ccf2" },
    { title: "Members List", icon: "👥", color: "#2ec4b6" },
    { title: "Income", icon: "💰", color: "#f4a261" },
  ];

  return (
    <div className="dashboard">
      <header className="header">
      <div class="logo-wrapper">
        <div class="logo-circle">LTF</div>
        <span class="logo-text">Life Time Fitness</span>
        <span class="logo-arrow">»</span>
        <span class="logo-sub-text">Admin Panel</span>

      </div>

        <div className="header-right">
          <div className="project-stats">
            <span>Active Members (3)</span>
            <span>Available Activities (1)</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="services">
        <h3>Select Services</h3>
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

export default Dashboard;
