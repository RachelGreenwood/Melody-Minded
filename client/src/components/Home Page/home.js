import React from 'react';
import choir_concert from './choir_concert.jpeg';

// Landing page
const Home = () => {
  return (
    <div>
        <h1>Welcome to Melody Minded!</h1>
        <img src={choir_concert} alt='A photo of a choral concert'></img>
    </div>
  );
};

export default Home;