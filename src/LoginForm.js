import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Form Submitted: Name - ${formData.name}, Email - ${formData.email}`);
  };

  <div className="form-container">
    <h1>Simple React Form</h1>
    <form onSubmit={handleSubmit} className="form">
      {/* Name Input */}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  </div>;
}
export default LoginForm;
