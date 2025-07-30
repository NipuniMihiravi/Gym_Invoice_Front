import React, { useState } from "react";
import axios from "axios";
import "./AppHome.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();

function MemberPaymentManager() {
  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(null);
  const [form, setForm] = useState({
    year: currentYear,
    month: "",
    amount: "",
    date: "",
    status: "Done",
  });

  // Fetch member data and payments by memberId
  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/members/by-member-id/${memberId}`);
      setMemberData(res.data);

      const paymentRes = await axios.get(`http://localhost:8081/api/payments/member/${memberId}`);
      const data = paymentRes.data;
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      alert("Error fetching member or payment data.");
      setMemberData(null);
      setPayments([]);
    }
  };

  // Check if a payment for the current year and given month is done
  const hasPaid = (month) => {
    if (!Array.isArray(payments)) return false;
    return payments.some(p => p.year === currentYear && p.month === month && p.status === "Done");
  };

  // Update form fields as user types
  const handlePaymentChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new payment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/payments", {
        ...form,
        memberId,
        year: currentYear,
        status: "Done",  // ensure status is done on submission
      });
      alert("Payment saved!");
      setShowPaymentForm(null);
      handleSearch(); // Refresh payments after submission
    } catch (err) {
      alert("Payment failed.");
    }
  };

  return (
    <div className="container">
      <h2>Member Payment Manager</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {memberData && (
        <div className="member-info">
          <h3>Member Details</h3>
          <p><strong>Name:</strong> {memberData.name}</p>
          <p><strong>Gender:</strong> {memberData.gender}</p>
          <p><strong>Username:</strong> {memberData.username}</p>
          <p><strong>Phone:</strong> {memberData.phone}</p>
          <p><strong>Address:</strong> {memberData.address}</p>
          <p><strong>Occupation:</strong> {memberData.occupation}</p>
        </div>
      )}

      {memberData && (
        <div className="payment-table">
          <h3>{currentYear} Monthly Payments</h3>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, index) => {
                const paid = hasPaid(month);
                return (
                  <tr key={index}>
                    <td>{month}</td>
                    <td>
                      {paid ? (
                        <span className="paid-status">Done</span>
                      ) : (
                        <span className="not-paid-status">Pending</span>
                      )}
                    </td>
                    <td>
                      {paid ? (
                        <button className="done-button" disabled>Done</button>
                      ) : (
                        <button
                          className="pay-button"
                          onClick={() => {
                            setShowPaymentForm(month);
                            setForm({
                              year: currentYear,
                              month: month,
                              amount: "",
                              date: new Date().toISOString().substring(0, 10),
                              status: "Done",
                            });
                          }}
                        >
                          Make Payment
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {showPaymentForm && (
            <form className="payment-form" onSubmit={handlePaymentSubmit}>
              <h4>Make Payment - {showPaymentForm}</h4>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handlePaymentChange}
                required
                min={0}
              />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handlePaymentChange}
                required
              />
              <button type="submit">Submit Payment</button>
              <button type="button" onClick={() => setShowPaymentForm(null)}>Cancel</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default MemberPaymentManager;
