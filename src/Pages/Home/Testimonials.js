import React from 'react';
import quote from '../../assets/icons/quote.svg';
import people1 from '../../assets/images/people1.png';
import Review from './Review';

const Testimonials = () => {
    // creating reviews for dynamic
    const reviews = [
        {
            _id: 1,
            name: 'Harry',
            location: 'california',
            img: people1
        },
        {
            _id: 2,
            name: 'Lara Croft',
            location: 'california',
            img: people1
        },
        {
            _id: 3,
            name: 'Mrs Annie',
            location: 'california',
            img: people1
        },
    ]

    return (
        <section className='my-28'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='text-xl text-primary font-bold'>Testimonials</h4>
                    <h2 className='text-3xl'>What Our Patients Say?</h2>
                </div>
                <div className='w-24 h-20 lg:w-48 lg:h-40'>
                    <img src={quote} alt="" />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    reviews.map(review => <Review key={review._id} review={review}></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonials;