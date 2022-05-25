import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const AvailableAppointments = ({ date }) => {
    // load the data for services
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])

    return (
        <div>
            <h4 className='text-secondary text-lg text-center'>Available Appointments on: {format(date, 'PP')}</h4>
            <div>

            </div>
        </div>
    );
};

export default AvailableAppointments;