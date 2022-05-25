import React from 'react';
import appointment from '../../assets/images/appointment.png';
import FocusButton from '../Shared/FocusButton';


const Contact = () => {
    return (
        <div style={{ background: `url(${appointment})` }}
            className='flex items-center justify-center'
        >
            <div class="card  w-full max-w-md  my-16">
                <div className='text-center'>
                    <h4 className='text-sm text-primary'>Contact Us</h4>
                    <h2 className='text-2xl text-white'>Stay Connected With Us.</h2>
                </div>
                <div class="card-body">
                    <div class="form-control">
                        <input type="text" placeholder="Type here" class="input input-bordered input-md w-full max-w-md mb-5" />
                        <input type="text" placeholder="Type here" class="input input-bordered input-md w-full max-w-md mb-5" />
                        <textarea class="textarea w-full max-w-md" placeholder="Your message" rows={6}></textarea>
                    </div>
                    <div class="form-control mt-6">
                        <FocusButton>Login</FocusButton>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;