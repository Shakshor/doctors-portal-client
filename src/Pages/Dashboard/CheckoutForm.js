import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';

const CheckoutForm = ({ appointment }) => {
    // error state
    const [cardError, setCardError] = useState('');

    // clientSecret state
    const [clientSecret, setClientSecret] = useState('');

    // hook
    const stripe = useStripe();

    // for options or elements
    const elements = useElements();

    // get price
    const { price } = appointment;


    useEffect(() => {
        fetch(' http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(data => {
                // console.log(data);
                if (data?.clientSecret) {
                    console.log(data.clientSecret);
                    setClientSecret(data.clientSecret)
                }
            });

    }, [price]);



    // form event handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        // data has not loaded
        if (!stripe || !elements) {
            return;
        }

        // accessing card info or elements
        const card = elements.getElement(CardElement);

        // checking card 
        if (card === null) {
            return;
        }

        // creating payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        // error checking

        /*----- Process -1 -------- 
        if (error) {
            // console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        } 
        --------------------------*/

        // --------- Process-2 ------
        // setCardError(error ? error.message : '');

        // -------- Process-3 ------- 
        setCardError(error?.message || '');



    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/*---- || !clientSecret ---*/}
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

            {/* ------- error showing -------- */}
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }

        </>
    );
};

export default CheckoutForm;