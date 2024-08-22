// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import googleIcon from '../components/google-icon.png'; // Import your Google icon image
import githubIcon from '../components/github-icon.png'; // Import your LinkedIn icon image
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const csrftoken = Cookies.get('csrftoken');

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });
  let navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(e)
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/api/signup/',
       formData,
        // { withCredentials: true },
        {
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
          }}
          );
      console.log(response);
      // Redirect or perform other actions upon successful registration
      // Check for success (adapt based on your API's response structure)
      if (response.status === 201 || response.status === 200) {
        navigate("/problem-set/");
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className='outside_container'>
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Repeat Password</label>
          <input 
              type="password" 
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <a href="/login" className="signup-link">
          Already have an account? Login
        </a>
      <hr className="or-separatorr" /> {/* Add a horizontal line */}
      <div className="or-sign-in-with">
          <p>Or sign in with:</p>
      </div>
      <div className="icon-container">
          <img src={googleIcon} alt="Google" />
          <img src={githubIcon} alt="LinkedIn" />
      </div>
      </div>
    </div>
    
  );
};

export default Signup;
