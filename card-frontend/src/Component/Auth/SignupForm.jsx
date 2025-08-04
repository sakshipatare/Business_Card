import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  console.log("SignupForm rendered");
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const { firstName, lastName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiUrl = "http://192.168.0.103:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle sublit:",);
    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          confirmPassword,
        })
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Signup successful! Please verify your account and then login.");
        navigate("/");
      } else {
        alert(result.message || "Signup failed.");
      }

    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="login-form__icon flex items-center justify-center mb-6">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="login-form__title text-center mb-2">Create Your Digital Business Card</h2>
        <p className="login-form__subtitle text-center text-gray-600 mb-6">Join thousands of professionals sharing their contact info digitally</p>

      {/* <form onSubmit={handleSubmit} className="login-form__form">
        <div className="login-form__field">
          <label className="login-form__label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="login-form__input"
            placeholder="John"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="login-form__input"
            placeholder="Doe"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="login-form__input"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="login-form__input"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="login-form__input"
            required
          />
        </div>

        <button type='submit'  onClick={() => console.log("Button clicked")} className="login-form__submit">Create Account</button>
      </form> */}

      <form className="login-form" onSubmit={handleSubmit}>

        <label>First Name</label>
        <input type="text" name="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <label>Last Name</label>
        <input type="text" name="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label>Email Address</label>
        <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password</label>
        <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        {/* <label>Password</label>
        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /> }

         <div className="options">
          <label>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />Remember me</label>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div> */}

        <button type="submit" className=" w-full relative overflow-hidden text-white font-bold bg-[#007bff] rounded-[5px] cursor-pointer py-2 px-4 
                  transition-colors duration-300 z-10
                  before:absolute before:top-0 before:left-1/2 before:w-0 before:h-full before:bg-[#0056b3] 
                  before:transition-all before:duration-300 before:ease-out 
                  hover:before:w-full hover:before:left-0
                  before:z-0 mb-6 mt-3"><span className="relative z-10">Sign Up</span></button>
      </form>

      <div className="login-form__footer text-center">
        <p className="login-form__footer-text">
          Already have an account?{' '}
          <Link to="/" className="text-[#007bff] font-medium hover:text-[#0056b3] transition-colors duration-300">Sign in</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default SignupForm;
