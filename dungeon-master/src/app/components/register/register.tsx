'use client'
import React from "react";
import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Here you would typically send the formData to a backend server for registration
    console.log('Registration data submitted:', formData);
    alert(`User ${formData.name} registered successfully!`);
    // Optionally clear the form after submission
    setFormData({
      name: '',
      username: '',
      password: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}