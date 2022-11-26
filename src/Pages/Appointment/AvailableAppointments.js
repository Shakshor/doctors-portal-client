import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Service from './Service';
import BookingModal from './BookingModal';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AvailableAppointments = ({ date }) => {
    // load the data for services
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);


    const formattedDate = format(date, 'PP');
    // using ReactQuery
    const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () => fetch(`  https://doctors-portal-server-eze2.onrender.com/available?date=${formattedDate}`)
        .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>;
    }

    /*   useEffect(() => {
          fetch(`  https://doctors-portal-server-eze2.onrender.com/available?date=${formattedDate}`)
              .then(res => res.json())
              .then(data => setServices(data));
      }, [formattedDate]) */

    return (
        <div>
            <h4 className='text-secondary text-lg text-center my-20'>Available Appointments on: {format(date, 'PP')}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service => <Service key={service._id} service={service}
                        setTreatment={setTreatment}
                    ></Service>)
                }
            </div>
            {treatment && <BookingModal date={date} treatment={treatment}
                setTreatment={setTreatment}
                refetch={refetch}
            ></BookingModal>}
        </div>
    );
};

export default AvailableAppointments;