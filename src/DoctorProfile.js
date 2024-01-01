import React from 'react';

const DoctorProfile = ({ doctor }) => {
    return (
        <div className="doctor-profile">
            <h3>{doctor.name}</h3>
            <p>Credentials: {doctor.credentials}</p>
            <p>Specialty: {doctor.specialty}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default DoctorProfile;
