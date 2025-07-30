import React, { useState } from "react";
import axios from "axios";
import "./AppHome.css";

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    occupation: "",
  });

  const bgStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/Images/gym.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/members/register", form);

      // Assuming the response returns a memberId
      const memberId = response.data.memberId;

      alert("Registered successfully! Your Member ID is " + memberId);
      setForm({
        name: "",
        gender: "",
        username: "",
        password: "",
        phone: "",
        address: "",
        occupation: "",
      });
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="form-container" style={bgStyle}>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Life Time Fitness <br /> Gym Membership Registration</h2>

        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="username">Username (Email)</label>
        <input
          id="username"
          type="email"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="occupation">Occupation</label>
        <input
          id="occupation"
          type="text"
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
