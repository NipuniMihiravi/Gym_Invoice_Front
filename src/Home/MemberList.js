import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppHome.css";

function MemberTable() {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [viewForm, setViewForm] = useState(null);



  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("https://gym-invoice-back.onrender.com/api/members");
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleView = (member) => {
    setViewForm(member);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`https://gym-invoice-back.onrender.com/api/members/${id}`);
        fetchMembers();
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setEditForm({ ...member });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://gym-invoice-back.onrender.com/api/members/${editingId}`, editForm);
      setEditingId(null);
      fetchMembers();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>All Registered Members</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Membership Type</th>
            <th>Membership Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.memberId}</td>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.membershipType}</td>
              <td>{m.membershipStatus}</td>
              <td>
               <button onClick={() => handleView(m)}>View</button>
                <button onClick={() => handleEditClick(m)}>Edit</button>
                <button onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit Member Details</h4>
            <div className="modal-grid">
              <div className="form-row">
                <label>Member ID</label>
                <input name="memberId" value={editForm.memberId || ""} readOnly />
              </div>
              <div className="form-row">
                <label>Full Name</label>
                <input name="name" value={editForm.name || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Phone</label>
                <input name="phone" value={editForm.phone || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Membership Type</label>
                <input name="membershipType" value={editForm.membershipType || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Membership Status</label>
                <input name="membershipStatus" value={editForm.membershipStatus || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Joined Date</label>
                <input name="joinedDate" value={editForm.joinedDate || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Gender</label>
                <input name="gender" value={editForm.gender || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Username</label>
                <input name="username" value={editForm.username || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Password</label>
                <input name="password" value={editForm.password || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Address</label>
                <input name="address" value={editForm.address || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Occupation</label>
                <input name="occupation" value={editForm.occupation || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Special Description</label>
                <input name="specialDescription" value={editForm.specialDescription || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Reg. Fee</label>
                <input name="registrationFee" value={editForm.registrationFee || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Reg. Status</label>
                <input name="registrationStatus" value={editForm.registrationStatus || ""} onChange={handleEditChange} />
              </div>
              <div className="form-row">
                <label>Fees</label>
                <input name="fees" value={editForm.fees || ""} onChange={handleEditChange} />
              </div>
            </div>
            <div className="form-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

       {/* View Modal */}
          {viewForm && (
            <div className="modal">
              <div className="modal-content">
                <h4>View Member Details</h4>
                <div className="modal-grid">
                  <div className="form-row"><label>Member ID</label><input value={viewForm.memberId} disabled /></div>
                  <div className="form-row"><label>Full Name</label><input value={viewForm.name} disabled /></div>
                  <div className="form-row"><label>Phone</label><input value={viewForm.phone} disabled /></div>
                  <div className="form-row"><label>Membership Type</label><input value={viewForm.membershipType} disabled /></div>
                  <div className="form-row"><label>Membership Status</label><input value={viewForm.membershipStatus} disabled /></div>
                  <div className="form-row"><label>Joined Date</label><input value={viewForm.joinedDate} disabled /></div>
                  <div className="form-row"><label>Gender</label><input value={viewForm.gender} disabled /></div>
                  <div className="form-row"><label>Username</label><input value={viewForm.username} disabled /></div>
                  <div className="form-row"><label>Password</label><input value={viewForm.password} disabled /></div>
                  <div className="form-row"><label>Address</label><input value={viewForm.address} disabled /></div>
                  <div className="form-row"><label>Occupation</label><input value={viewForm.occupation} disabled /></div>
                  <div className="form-row"><label>Special Description</label><input value={viewForm.specialDescription} disabled /></div>
                  <div className="form-row"><label>Reg. Fee</label><input value={viewForm.registrationFee} disabled /></div>
                  <div className="form-row"><label>Reg. Status</label><input value={viewForm.registrationStatus} disabled /></div>
                  <div className="form-row"><label>Fees</label><input value={viewForm.fees} disabled /></div>
                </div>
                <div className="form-actions">
                  <button onClick={() => setViewForm(null)}>Close</button>
                </div>
              </div>
            </div>
          )}
    </div>

  );
}

export default MemberTable;
