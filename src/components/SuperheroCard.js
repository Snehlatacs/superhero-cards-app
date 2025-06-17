// src/components/SuperheroCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SuperheroCard.css';

function SuperheroCard({ name, power, image, views }) {
  return (
    <Link to={`/hero/${name}`} className="card-link">
      <div className="card">
        <img src={image} alt={name} className="card-image" />
        <h2>{name}</h2>
        <p><strong>Power:</strong> {power}</p>
        <p className="card-views">👁️ {views} views</p> {/* 👈 Add views here */}
      </div>
    </Link>
  );
}

export default SuperheroCard;
