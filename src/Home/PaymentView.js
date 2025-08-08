import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppHome.css";
import "../Admin/Admin.css";
import { useNavigate } from "react-router-dom";

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    memberId: "",
    year: "",
    month: "",
    amount: "",
    date: "",
    status: ""
  });

  // Search filters
  const [filters, setFilters] = useState({
    memberId: "",
    year: "",
    month: "",
    amount: "",
    date: "",
    status: ""
  });

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      const res = await axios.get("https://gym-invoice-back.onrender.com/api/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await axios.delete(`https://gym-invoice-back.onrender.com/api/payments/${id}`);
        fetchPayments();
      } catch (err) {
        console.error("Failed to delete payment", err);
      }
    }
  };

  // Start editing
  const startEdit = (payment) => {
    setEditingId(payment.id);
    setEditForm({
      ...payment,
      date: payment.date ? payment.date.substring(0, 10) : ""
    });
  };

  // Handle edit form change
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://gym-invoice-back.onrender.com/api/payments/${editingId}`,
        { ...editForm, date: new Date(editForm.date) }
      );
      setEditingId(null);
      fetchPayments();
    } catch (err) {
      console.error("Failed to update payment", err);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter payments based on all fields
  const filteredPayments = payments.filter((p) => {
    return (
      p.memberId.toLowerCase().includes(filters.memberId.toLowerCase()) &&
      p.year.toString().includes(filters.year) &&
      p.month.toLowerCase().includes(filters.month.toLowerCase()) &&
      p.amount.toString().includes(filters.amount) &&
      p.date.toLowerCase().includes(filters.date.toLowerCase()) &&
      p.status.toLowerCase().includes(filters.status.toLowerCase())
    );
  });

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo-wrapper">
          <div className="logo-circle">LTF</div>
          <span className="logo-text">Life Time Fitness</span>
          <span className="logo-arrow">»</span>
          <span className="logo-sub-text-button" onClick={() => navigate("/dashboard")}>
            Admin Panel
          </span>
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

      <div className="payment-container">
        <h2>Payment Records</h2>

        {/* Search Filters Row */}
        <div className="filters">
          <input name="memberId" placeholder="Search Member ID" value={filters.memberId} onChange={handleFilterChange} />
          <input name="year" placeholder="Search Year" value={filters.year} onChange={handleFilterChange} />
          <input name="month" placeholder="Search Month" value={filters.month} onChange={handleFilterChange} />
          <input name="amount" placeholder="Search Amount" value={filters.amount} onChange={handleFilterChange} />
          <input name="date" placeholder="Search Date" value={filters.date} onChange={handleFilterChange} />
          <input name="status" placeholder="Search Status" value={filters.status} onChange={handleFilterChange} />
        </div>

        <table className="payment-table">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Year</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p.id}>
                {editingId === p.id ? (
                  <>
                    <td><input name="memberId" value={editForm.memberId} onChange={handleChange} /></td>
                    <td><input name="year" value={editForm.year} onChange={handleChange} /></td>
                    <td><input name="month" value={editForm.month} onChange={handleChange} /></td>
                    <td><input type="number" name="amount" value={editForm.amount} onChange={handleChange} /></td>
                    <td><input type="date" name="date" value={editForm.date} onChange={handleChange} /></td>
                    <td>
                      <select name="status" value={editForm.status} onChange={handleChange}>
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.memberId}</td>
                    <td>{p.year}</td>
                    <td>{p.month}</td>
                    <td>{p.amount}</td>
                    <td>{p.date}</td>
                    <td>{p.status}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentList;
