import React from 'react';
import doctor from '../../assets/images/doctor.png';
import appointment from '../../assets/images/appointment.png';
import FocusButton from '../Shared/FocusButton';


const MakeAppointment = () => {
    return (
        <section
            style={{ background: `url(${appointment})` }}
            className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-150px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 p-5'>
                <h3 className='text-xl text-primary font-bold'>Appoinment</h3>
                <h2 className='text-3xl text-white py-5'>Make an Appointment Today</h2>
                <p className='text-white pb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptate deleniti alias possimus odit quisquam ducimus eos labore dignissimos, maiores modi suscipit non quibusdam obcaecati veniam, nesciunt hic quis voluptatibus voluptatum fugit odio molestiae sapiente. Sed sint voluptates laborum quasi!</p>
                <FocusButton>Get Started</FocusButton>
            </div>
        </section>
    );
};

export default MakeAppointment;