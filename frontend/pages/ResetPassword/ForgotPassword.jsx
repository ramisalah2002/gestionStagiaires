import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { FiKey } from 'react-icons/fi';
import { BsArrowLeft } from 'react-icons/bs';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
  
    // Generate a token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
    // Set the token and email to cookies
    document.cookie = `email=${email};max-age=300`; // 300 seconds = 5 minutes
    document.cookie = `token=${token};max-age=300`;
  
    // Prepare the email data
    const templateParams = {
      user_email : email,
      user_name: "User", // Replace "User" with the user's name
      message: `${window.location.origin}/reset-password/${token}`
    };
  
    // Send the email
    emailjs.send('service_qf5nk4n', 'template_nam9a9e', templateParams, 'WrNLXx0JfCLRI5jeK')
      .then((result) => {
        console.log(result.text);
        navigate('/reset-email-sent/');
      }, (error) => {
        console.log(error.text);
      });
  };
  

  return (
    <div className='reset-password-wrapper'>
      <form className='reset-password-container' onSubmit={sendEmail}>
        <div className='key-icon-container'>
          <FiKey className='key-icon'></FiKey>
        </div>
        <label className='reset-password-title'>Mot de passe oublié?</label>
        <p className='reset-password-paragraph'>Pas de soucis, nous vous enverrons des instructions de réinitialisation</p>
        <div className='reset-password-email-container'>
          <label>Email</label>
          <input placeholder='Entrez votre email' type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className='reset-button'>Réinitialiser</button>
        <div className='go-back-link'>
          <FontAwesomeIcon className="go-back-icon" icon={faArrowLeft} />
          <label onClick={() => navigate("/encadrant/login")}>Revenir à la page de connexion</label>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
