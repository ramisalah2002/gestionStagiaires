import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faKey, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons';
import { FiKey, FiMail, FiUserCheck, FiUserX } from 'react-icons/fi';
import './AbsenceMarking.css';

const StagiaireAbsenceMarking = () => {
  const [isWithinPerimeter, setIsWithinPerimeter] = useState(false);
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [showModal, setShowModal] = useState(true);

  const perimeterCoordinates = {
    latitude: 33.9881874,
    longitude: -6.8572053
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6378137; // Radius of the Earth in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentCoordinates({ latitude, longitude });
    };

    const errorCallback = (error) => {
      console.error('Error getting current coordinates:', error);
    };

    // Get current coordinates
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    if (currentCoordinates) {
      const distance = calculateDistance(
        currentCoordinates.latitude,
        currentCoordinates.longitude,
        perimeterCoordinates.latitude,
        perimeterCoordinates.longitude
      );

      setIsWithinPerimeter(distance <= 900);
    }
  }, [currentCoordinates]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${currentCoordinates.latitude}&lon=${currentCoordinates.longitude}&format=json&accept-language=fr`
        );
        if (response.ok) {
          const data = await response.json();
          const locationName = data.display_name.split(',')[0].trim();
          setCurrentLocation(locationName);
        } else {
          console.log('Error fetching location');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (currentCoordinates) {
      fetchLocation();
    }
  }, [currentCoordinates]);
  
  




  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay-absence">
          <div className="modal-absence">
            <div className='user-check-container'>
              {isWithinPerimeter ? (
                <FiUserCheck className='user-check-icon'></FiUserCheck>
              ) : (
                <FiUserX className='user-check-icon'></FiUserX>
              )}
            </div>
            {/* <label className='absence-modal-title'>Vous êtes
              {isWithinPerimeter ? (
                " Présent"
              ) : (
                " Absent"
              )}
            </label> */}
            <div className="absence-section-a">
              <div className="absence-section-left">
                <FontAwesomeIcon className="absence-section-icon" icon={faLocationDot} />
              </div>
              <div className="absence-section-right">
                <label className="absence-section-title">Votre localisation</label>
                {isWithinPerimeter ? (
                  " DSI MEN"
                ) : (
                  <label className="absence-section-paragraph">{currentLocation}</label>
                )}
              </div>
            </div>

              {!isWithinPerimeter ? (
                <>
                  <p className='absence-modal-paragraph-2'>Je justifie mon absence</p>
                  <textarea placeholder='Ecrivez votre justification' className='absence-modal-textarea'></textarea>
                </>
              ) : (
                ""
              )}
            <Link to="https://www.google.com/gmail" className='mark-absence-button'>Je marque
              {isWithinPerimeter ? (
                " ma présense"
              ) : (
                " mon absence"
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default StagiaireAbsenceMarking;
