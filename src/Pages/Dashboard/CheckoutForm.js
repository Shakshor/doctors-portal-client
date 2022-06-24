import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';

const CheckoutForm = ({ appointment }) => {
    // error state
    const [cardError, setCardError] = useState('');
    // set success state
    const [success, setSuccess] = useState('');
    // spinner for whole processing in update
    const [processing, setProcessing] = useState(false);
    // clientSecret state
    const [clientSecret, setClientSecret] = useState('');
    // transaction id
    const [transactionId, setTransactionId] = useState('');


    // hook
    const stripe = useStripe();

    // for options or elements
    const elements = useElements();

    // get price
    const { _id, price, patient, patientName } = appointment;


    useEffect(() => {
        fetch(' http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then(res => {
                // console.log(res);
                return res.json()
            })
            .then(data => {
                // console.log(data);
                if (data?.clientSecret) {
                    // console.log(data.clientSecret);
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
        setSuccess('');
        setProcessing(true);


        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patient,
                    },
                },
            },
        );

        // set intentError
        if (intentError) {
            setCardError(intentError);
            setProcessing(false);

        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setSuccess('Congrats!Your payment is complete')

            // store payment on database
            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id,

            }
            fetch(`http://localhost:5000/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                })
        }

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
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>

            {/* ------- error showing -------- */}
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }

            {/*--processing messProcessing-----  */}
            {
                success && <div className='text-green-500'>
                    <p>{success}</p>
                    <p>Your transaction Id: <span className="text-orange-500">{transactionId}</span></p>
                </div>
            }

        </>
    );
};

export default CheckoutForm;