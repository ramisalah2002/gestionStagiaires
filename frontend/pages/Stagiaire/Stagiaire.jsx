import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCircleUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUser, faRectangleList, faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import './Stagiaire.css';
// import 'bootstrap/dist/css/bootstrap.css';



function Stagiaire() {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
          <tr>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
          </tr>
          {/* Add more table rows as needed */}
        </tbody>
      </table>
    </div>
    
  );
}

export default Stagiaire;
