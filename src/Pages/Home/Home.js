import React from 'react';
import Banner from './Banner';
import BannerTwo from './BannerTwo';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';

const Home = () => {
    return (
        <div className='px-12'>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <BannerTwo></BannerTwo>
            <MakeAppointment></MakeAppointment>
        </div>
    );
};

export default Home;