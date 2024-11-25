import React from 'react';
import './shortdisease.css'; // Optional: For custom styling

const ShortDisease = ({ disease, symptoms, updateList, trackList, doctors }) => {
  return (
    <div className="short-disease">
      <p>
        <strong className='diseasename'>{disease}</strong>: {symptoms.join(', ')}
      </p>
      
      {/* Display doctors if available */}
      {doctors && doctors.length > 0 && (
        <div className="doctorInfo">
          <h4>Recommended Doctors:</h4>
          <div className="doctorList">
            {doctors.map((doctor, index) => (
              <div key={index} className="doctorCard">
                <p className="doctorName">{doctor.name}</p>
                <p className="doctorSpecialty">{doctor.specialty}</p>
                <p className="doctorLocation">{doctor.location}</p>
                <p className="doctorContact">{doctor.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortDisease;
