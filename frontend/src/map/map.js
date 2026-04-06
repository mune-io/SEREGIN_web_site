import React, { useState } from 'react';
import MapComponent from './from_db_fetcher';
// import './App.css';

const Map = () => {
    const [deviceNumber, setDeviceNumber] = useState(localStorage.getItem('deviceNumber') || '');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
        <div >
            <MapComponent
                deviceNumber={deviceNumber}
                setDeviceNumber={setDeviceNumber}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
        </div>
    );
};

export default Map;

