import React, { useState } from "react";
import axios from "axios";

function PaymentViewer() {
  const [memberLink, setMemberLink] = useState("");
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`https://gym-invoice-back.onrender.com/api/register/${memberLink}/payments`);
      setPayments(res.data);
      setError(null);
    } catch (err) {
      setError("Member not found or error fetching payments");
      setPayments([]);
    }
  };

  return (
    <div>
      <h2>View Your Payments</h2>
      <input
        type="text"
        placeholder="Enter your Member Link"
        value={memberLink}
        onChange={(e) => setMemberLink(e.target.value)}
      />
      <button onClick={fetchPayments}>Show Payments</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {payments.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id}>
                <td>{pay.paymentDate}</td>
                <td>{pay.amount}</td>
                <td>{pay.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentViewer;
