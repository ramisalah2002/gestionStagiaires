import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { FiKey } from 'react-icons/fi';
import { BsArrowLeft } from 'react-icons/bs';
import './NotFoundPage.css';

const NotFoundPage = () => {

  return (
    <div className='not-found-wrapper'>
      <div className='not-found-container'>
        <img src='../../images/NotFound.jpg'/>
        <label className='not-found-title'>Oops! Page non trouvée</label>
        <label className='not-found-paragraph'>la page que vous cherchez est introuvable :(</label>
        <label className='not-found-paragraph'>Nous vous proposons de revenir</label>
        <Link to="/encadrant/accueil" className='go-home'>Retour</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
