'use client'
import React from "react";
import { useState } from "react";
import { API_BASE_URL } from "@/app/config/api";
import { useLoadingNavigation } from "@/app/hooks/useLoadingNavigation";

export default function Register() {
    const router = useRouter();
    const { navigateWithLoading } = useLoadingNavigation();
    const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

    const [formData, setFormData] = useState({
      name: '',
      username: '',
      password: '',
    });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  interface ValidationErrors {
    name?: string;
    username?: string;
    password?: string;
  }

  const VALID_CHARS_REGEX = /^[a-zA-Z0-9-._]+$/; 
  // Explanation:
  // [a-zA-Z0-9-._] : Allows lowercase letters, uppercase letters, numbers, hyphen, underscore, and period.
  // + : Requires one or more of the allowed characters.

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    } else if (!VALID_CHARS_REGEX.test(formData.name.trim())) { // Check for invalid characters
      errors.name = 'Name can only contain letters, numbers, hyphens (-), underscores (_), and periods (.). No spaces allowed.';
    }

    if (formData.username.trim().length < 4) {
      errors.username = 'Username must be at least 4 characters long.';
    } else if (!VALID_CHARS_REGEX.test(formData.username.trim())) {
      errors.username = 'Username can only contain letters, numbers, hyphens (-), underscores (_), and periods (.). No spaces allowed.';
    }

    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    } else if (!VALID_CHARS_REGEX.test(formData.username.trim())) {
      errors.username = 'Password can only contain letters, numbers, hyphens (-), underscores (_), and periods (.). No spaces allowed.';
    }
    
    return errors;
  }

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]:undefined
    }))
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const errors = validateForm();
    if(Object.keys(errors).length >0){
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({})
    setServerError('')

    setIsLoading(true)

    try{
      const response = await fetch(`${API_BASE_URL}/userData`, {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });
      if (!response.ok){
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error(`Registration failed with status: ${response.status}`);
        }
        throw new Error(errorData.message || 'Username already exists.');
      }
      if (response.ok){
        // Store username in localStorage
        localStorage.setItem('username', formData.username);
        // Redirect to character creation
        navigateWithLoading("/pages/characterInfo", "Creating your hero...");
      }
      setFormData({
        name: '',
        username: '',
        password: '',
      });
    } catch (err){
      const message = (err instanceof Error) ? err.message : "An unknown error occurred.";
      console.error("Failed to send userData: ", message);
      setServerError(message)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="credentials-container">
      <form onSubmit={handleSubmit} className="credentials-form">
        <h2 style={{ 
          textAlign: 'center', 
          color: '#f6e9c9', 
          fontSize: '1.75rem', 
          fontWeight: '700',
          marginBottom: '0.5rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Create Account
        </h2>
        <div>
          <label className="input-group" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Letters and numbers only"
            required
          />
          {validationErrors.name && <p style={{color: 'red'}}>{validationErrors.name}</p>}
        </div>
        <div>
          <label className="input-group" htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Letters and numbers only"
            required
          />
          {validationErrors.username && <p style={{ color: 'red'}}>{validationErrors.username}</p>}
        </div>
        <div>
          <label className="input-group" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Letters and numbers only"
            required
          />
          {validationErrors.password && <p style={{ color: 'red' }}>{validationErrors.password}</p>}
        </div>
        <button 
          className="submit-button" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={{ color: '#f6e9c9', backgroundColor: 'rgba(220, 38, 38, 0.8)', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: '500' }}>{error}</p>}
      </form>
    </div>
  );
}