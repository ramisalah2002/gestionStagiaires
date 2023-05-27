import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import './ResetPassword.css';
import { faArrowLeft, faKey, faLock} from '@fortawesome/free-solid-svg-icons';
import {FiKey} from 'react-icons/fi';
import {BsArrowLeft} from 'react-icons/bs';

const ResetPassword = () => {
  const { userId } = useParams();

  return (
    <div className='reset-password-wrapper'>
      <div className='reset-password-container'>
        <div className='key-icon-container'>
          <FiKey className='key-icon'></FiKey>
        </div>
        <label className='reset-password-title'>Mot de passe oublié?</label>
        <p className='reset-password-paragraph'>Pas de soucis, nous vous enverrons des instructions de réinitialisation</p>
        <div className='reset-password-email-container'>
          <label>Email</label>
          <input placeholder='Entrez votre email' type="email"/>
        </div>
        <button className='reset-button'>Réinitialiser</button>
        <Link to="/stagiaires" className='go-back-link'>
          <FontAwesomeIcon className="go-back-icon" icon={faArrowLeft} />
          <label>Revenir à la page de connexion</label>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
