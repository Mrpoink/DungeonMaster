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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Registration data submitted:', formData);
    alert(`User ${formData.name} registered successfully!`);
    setFormData({
      name: '',
      username: '',
      password: '',
    });
    try{
      const response = await fetch('http://localhost:1068/userData', {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });
    } catch (error){
      console.error("Failed to send userData: ", error)
    }
  };

  return (
    <div className="credentials-container">
      <form onSubmit={handleSubmit} className="credentials-form">
        <div>
          <label className="input-group" htmlFor="name">Name:</label>
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
          <label className="input-group" htmlFor="username">Username:</label>
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
          <label className="input-group" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}