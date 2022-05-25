import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import Event from '../Event/Event'

const Home = () => {
    return (
        <div id="home">
           <Navbar />
           <Event />
        </div>
    );
};

export default Home;