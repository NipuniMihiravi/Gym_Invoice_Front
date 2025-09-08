import React, { useEffect, useState } from 'react';
import './Admin.css';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMembers, setActiveMembers] = useState(0);

  const handleLogout = () => {
    navigate('/');
  };

  const services = [
    { title: "Registration", icon: "📝", color: "#f95959" },
    { title: "Payment", icon: "💳", color: "#56ccf2" },
    { title: "Members List", icon: "👥", color: "#2ec4b6" },
    { title: "System", icon: "⚙️", color: "#f4a261" },
  ];

  // Fetch from backend
  useEffect(() => {
    fetch("https://gym-invoice.onrender.com/api/members/active/count")
      .then((res) => res.json())
      .then((data) => setActiveMembers(data))
      .catch((err) => console.error("Error fetching active members:", err));
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo-wrapper">
          <div className="logo-circle">LTF</div>
          <span className="logo-text">Life Time Fitness</span>
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
