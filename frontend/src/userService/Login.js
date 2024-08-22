// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import './login.css';
import googleIcon from '../components/google-icon.png'; // Import your Google icon image
import githubIcon from '../components/github-icon.png'; // Import your LinkedIn icon image
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import AuthContext from '../views/authContext';  // adjust the path accordingly





const Login = () => {
  const {setCurrentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // Create an axios instance with the base URL
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/account/login/', formData, {withCredentials: true});
      console.log(response.data);
      setMessage(response.data.message);
      if (response.status === 200) {
        // Assuming the response contains the user data after a successful login
        setCurrentUser(response.data.user);
        console.log(response.data.user)
      }
      navigate("/problem-set/");

      // Redirect or perform other actions upon successful login
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='outside_container'>
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
        <a href="/reset-password" className="forgot-password-link">
          Forgot password?
        </a>
      </form>
      <a href="/signup" className="signup-link">
          Don't have an account yet? Signup
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

export default Login;
