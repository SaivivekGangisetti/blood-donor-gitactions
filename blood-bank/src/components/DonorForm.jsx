import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const DonorForm = ({ selectedDonor, refreshData, clearSelection }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    age: "",
    email: "",
    contactNo: "",
    address: "",
    bloodGroup: ""
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (selectedDonor) {
      setFormData(selectedDonor);
      setEditing(true);
    }
  }, [selectedDonor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${config.BASE_URL}/update`, formData);
      } else {
        await axios.post(`${config.BASE_URL}/add`, formData);
      }
      setFormData({ id: null, name: "", age: "", email: "", contactNo: "", address: "", bloodGroup: "" });
      setEditing(false);
      clearSelection();
      refreshData();
    } catch (error) {
      console.error("Error saving donor:", error);
      alert("Operation failed. Check console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{editing ? "Edit Donor" : "Add Donor"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact No" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <button type="submit" style={styles.button}>{editing ? "Update" : "Add"}</button>
        {editing && <button type="button" onClick={() => { setEditing(false); setFormData({ id: null, name: "", age: "", email: "", contactNo: "", address: "", bloodGroup: "" }); clearSelection(); }} style={styles.cancelButton}>Cancel</button>}
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "2rem" },
  form: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  button: { padding: "8px", backgroundColor: "#1e90ff", color: "#fff", border: "none", cursor: "pointer" },
  cancelButton: { padding: "8px", backgroundColor: "#ccc", color: "#000", border: "none", cursor: "pointer", marginTop: "5px" }
};

export default DonorForm;
