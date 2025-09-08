import React, { useState, useEffect  } from "react";
import axios from "axios";
import "./AppHome.css";
import '../Admin/Admin.css';
import { useNavigate } from 'react-router-dom';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();

function MemberPaymentManager() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(null);
  const [membershipTypes, setMembershipTypes] = useState([]);
  const [form, setForm] = useState({
    year: currentYear,
    month: "",
    amount: "",
    date: new Date().toISOString().substring(0, 10),
    status: "Done",
  });

  useEffect(() => {

  const fetchMembershipTypes = async () => {
        try {
          const res = await axios.get("https://gym-invoice-back.onrender.com/api/memberships");
          setMembershipTypes(res.data);
        } catch (error) {
          console.error("Error fetching membership types:", error);
        }
      };
      fetchMembershipTypes();
    }, []);


  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://gym-invoice-back.onrender.com/api/members/by-member-id/${memberId}`);
      setMemberData(res.data);

      const paymentRes = await axios.get(`https://gym-invoice-back.onrender.com/api/payments/member/${memberId}`);
      const data = paymentRes.data;
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      alert("Error fetching member or payment data.");
      setMemberData(null);
      setPayments([]);
    }
  };

  const hasPaid = (month) => {
    return payments.some(p => p.year === currentYear && p.month === month && p.status === "Done");
  };

  const isAbsent = (month) => {
    return payments.some(p => p.year === currentYear && p.month === month && p.status === "Absent");
  };

  const getPaidDate = (month) => {
    const payment = payments.find(p => p.year === currentYear && p.month === month && p.status === "Done");
    return payment ? payment.date : "-";
  };

  const handlePaymentChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://gym-invoice-back.onrender.com/api/payments", {
        ...form,
        memberId,
        year: currentYear,
        status: "Done"
      });
      alert("Payment saved!");
      setShowPaymentForm(null);
      handleSearch(); // Refresh payments
    } catch (err) {
      alert("Payment failed.");
    }
  };

  const handleAbsentStatus = async () => {
    try {
      await axios.post("https://gym-invoice-back.onrender.com/api/payments", {
        memberId,
        year: currentYear,
        month: showPaymentForm,
        amount: 0,
        date: new Date().toISOString().substring(0, 10),
        status: "Absent"
      });
      alert("Marked as absent.");
      setShowPaymentForm(null);
      handleSearch(); // Refresh
    } catch (err) {
      alert("Failed to mark as absent.");
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo-wrapper">
          <div className="logo-circle">PT</div>
          <span className="logo-text">Pulse Fitness</span>
          <span className="logo-arrow">»</span>
          <span className="logo-sub-text-button" onClick={() => navigate('/dashboard')}>
            Admin Panel
          </span>
        </div>

        <div className="header-right">

          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="payment-wrapper">
        <div className="payment-container">
          <h2>Manage Member Payments</h2>

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
            <>
              <table className="member-info-table">
                <tbody>
                  <tr>
                    <td colSpan="2" className="member-name-row">
                      <span className="member-name">{memberData.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="member-details-row2"><strong>Email:</strong> {memberData.username}</td>
                    <td className="member-details-row2"><strong>Phone No:</strong> {memberData.phone}</td>
                  </tr>
                  <tr>
                    <td className="member-details-row2"><strong>Membership Type:</strong> {memberData.membershipType}</td>
                    <td className="member-details-row2"><strong>Joined Date:</strong> {memberData.joinedDate}</td>
                  </tr>
                  <tr>
                   <td className="member-details-row2">
                       <strong>Fees (Rs.):</strong>
                       {(() => {
                         const selectedType = membershipTypes.find(
                           type => type.type === memberData.membershipType
                         );
                         return selectedType ? selectedType.fee : "N/A";
                       })()}
                     </td>
                  </tr>
                </tbody>
              </table>

              <div className="payment-table">
                <h3>{currentYear} Monthly Payments</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Status</th>
                      <th>Paid Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {months.map((month, index) => {
                      const paid = hasPaid(month);
                      const absent = isAbsent(month);

                      return (
                        <tr key={index}>
                          <td>{month}</td>
                          <td>
                            {absent ? (
                              <span className="absent-status">Absent</span>
                            ) : paid ? (
                              <span className="paid-status">Done</span>
                            ) : (
                              <span className="not-paid-status">Pending</span>
                            )}
                          </td>
                          <td>{getPaidDate(month)}</td>
                          <td>
                            {paid || absent ? (
                              <button className="done-button" disabled>{absent ? "Absent" : "Done"}</button>
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
                                    status: "Done"
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
                  <div className="modal-overlay">
                    <div className="modal-content">
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
                        <div className="modal-buttons">
                          <button type="submit">Submit Payment</button>
                          <button type="button" onClick={handleAbsentStatus}>Mark as Absent</button>

                          <button type="button" onClick={() => setShowPaymentForm(null)}>Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberPaymentManager;
