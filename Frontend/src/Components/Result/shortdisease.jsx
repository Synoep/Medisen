// ShortDisease.js
import React from 'react';
import './shortdisease.css'; // Optional: For custom styling

const ShortDisease = ({ disease, symptoms, updateList, trackList }) => {
  return (
    <div className="short-disease">
        
      <p>
        <strong>{disease}</strong>: {symptoms.join(', ')}
      </p>
     
    </div>
  );
};

export default ShortDisease;
