import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { FiKey } from 'react-icons/fi';
import { BsArrowLeft } from 'react-icons/bs';
import './ForgotPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token || cookies.token !== token) {
      navigate('/page-not-found');
    }
  }, [cookies.token, token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle password reset logic here...
  };

  return (
    <div className='reset-password-wrapper'>
      <form className='reset-password-container' onSubmit={handleSubmit}>
        <div className='key-icon-container'>
          <FiKey className='key-icon'></FiKey>
        </div>
        <label className='reset-password-title'>Définir un nouveau mot de passe</label>
        <p className='reset-password-paragraph'>Veuillez taper le nouveau mot de passe que vous souhaitez définir</p>
        <div className='reset-password-email-container'>
          <label>Mot de passe</label>
          <input
            placeholder='********'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='reset-password-email-container'>
          <label>Confirmer le mot de passe</label>
          <input
            placeholder='********'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className='reset-button' type='submit'>Réinitialiser</button>
        <Link to="/encadrant/login" className='go-back-link'>
          <FontAwesomeIcon className="go-back-icon" icon={faArrowLeft} />
          <label>Revenir à la page de connexion</label>
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
