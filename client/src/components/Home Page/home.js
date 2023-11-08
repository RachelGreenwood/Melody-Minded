import React from 'react';
import choir_concert from './choir_concert.jpeg';
import './home.css';

// Landing page
const Home = () => {
  return (
    <div>
        <h1>Welcome to Melody Minded!</h1>
        <img id='concert' src={choir_concert} alt='A photo of a choral concert'></img>
        <p>Melody Minded is a music theory education application for students ages 5-15 that uses quizzes to teach musical concepts.</p>
        <p>As a former Choir Director, I believe that music should be accessible to everyone, regardless of location, economic status, or skill level.</p>
        <p>Start with lesson one and work your way through the curriculum, then leave your comments and questions in the forum to connect with other users. Make sure you're practicing the concepts you learn by singing wherever and whenever you can!</p>
        <p>Click "lesson one" in the navigation bar to get started!</p>
    </div>
  );
};

export default Home;