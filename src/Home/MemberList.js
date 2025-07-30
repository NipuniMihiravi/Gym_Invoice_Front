import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppHome.css";

function MemberTable() {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:8081/api/members/${id}`);
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
            <th>Full Name</th>
            <th>Gender</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Occupation</th>
            <th>Special Description</th>
            <th>Membership Type</th>
            <th>Member ID</th>
            <th>Reg. Fee</th>
            <th>Reg. Status</th>
            <th>Membership Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) =>
            editingId === m.id ? (
              <tr key={m.id}>
                <td>
                  <input
                    name="name"
                    value={editForm.name || ""}
                    onChange={handleEditChange}
                  />
                </td>

                <td>
                                  <input
                                    name="gender"
                                    value={editForm.gender || ""}
                                    onChange={handleEditChange}
                                  />
                                </td>
                <td>
                  <input
                    name="email"
                    value={editForm.username || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="password"
                    value={editForm.password || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    value={editForm.phone || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="address"
                    value={editForm.address || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="occupation"
                    value={editForm.occupation || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="specialDescription"
                    value={editForm.specialDescription || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="membershipType"
                    value={editForm.membershipType || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>{editForm.memberId}</td> {/* Auto-generated; not editable */}
                <td>
                  <input
                    name="registrationFee"
                    value={editForm.registrationFee || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="registrationStatus"
                    value={editForm.registrationStatus || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="membershipStatus"
                    value={editForm.membershipStatus || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.gender}</td>
                <td>{m.username}</td>
                <td>{m.password}</td>
                <td>{m.phone}</td>
                <td>{m.address}</td>
                <td>{m.occupation}</td>
                <td>{m.specialDescription}</td>
                <td>{m.membershipType}</td>
                <td>{m.memberId}</td>
                <td>{m.registrationFee || "-"}</td>
                <td>{m.registrationStatus || "-"}</td>
                <td>{m.membershipStatus || "-"}</td>
                <td>
                  <button onClick={() => handleEditClick(m)}>Edit</button>
                  <button onClick={() => handleDelete(m.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;
