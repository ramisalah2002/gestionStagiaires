import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { FiKey, FiMail } from 'react-icons/fi';
import { BsArrowLeft } from 'react-icons/bs';
import './ForgotPassword.css';

const EmailSent = () => {

  return (
    <div className='reset-password-wrapper'>
      <div className='reset-password-container'>
        <div className='key-icon-container'>
          <FiMail className='email-icon'></FiMail>
        </div>
        <label className='reset-password-title'>Vérifier votre e-mail</label>
        <p className='reset-password-paragraph'>Nous avons envoyé un email de réinitialisation du mot de passe</p>
        <Link to="https://www.google.com/gmail" target="_blank" className='reset-button'>Vérifier ma boîte de récéption</Link>
        <Link to="/encadrant/login" className='go-back-link'>
          <FontAwesomeIcon className="go-back-icon" icon={faArrowLeft} />
          <label>Revenir à la page de connexion</label>
        </Link>
      </div>
    </div>
  );
};

export default EmailSent;
