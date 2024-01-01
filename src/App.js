import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorProfile from './DoctorProfile';

function App() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/doctors')
            .then(response => {
                setDoctors(response.data);
            });
    }, []);

    return (
        <div>
            {doctors.map(doctor => (
                <DoctorProfile key={doctor.id} doctor={doctor} />
            ))}
        </div>
    );
}

export default App;
