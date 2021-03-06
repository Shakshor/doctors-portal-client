import React from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import chair_bg from '../../assets/images/bg.png';

const AppointmentBanner = ({ date, setDate }) => {

    return (
        <div className="hero min-h-screen" style={{ background: `url(${chair_bg})`, backgroundSize: 'cover' }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt='Dentist Chair' />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                    {/* <p>You have selected: {format(date, 'PP')}</p> */}
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;