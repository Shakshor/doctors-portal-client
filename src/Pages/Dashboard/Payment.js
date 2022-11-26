import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe('pk_test_51LAtbZA3wrWUcM5O3CsaHF7FMSlSfrHWGK1Kwp9HvkhZvDoNBxOmSM4rYWK4fBmkclflH0vRrVJoK6R3Q48e8LqT005crCITCC');

const Payment = () => {
    const { id } = useParams();

    const url = `  https://doctors-portal-server-eze2.onrender.com/booking/${id}`;
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        console.log(res);
        return res.json()
    }));

    if (isLoading) {
        return <Loading></Loading>;
    }


    return (
        <div>
            <h2 className='text-xl'>Payment Page.:{id}</h2>

            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div class="card-body">
                    <p className='text-success font-bold'>Hello, {appointment.patientName}</p>
                    <h2 class="card-title">Please Pay for {appointment.treatment}</h2>
                    <p>We will see you on <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
                    <p>Please pay: ${appointment.price}</p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    {/* ----- React Strip Process For Payment */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />{/*--- component --- */}
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;