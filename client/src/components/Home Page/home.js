import React, { useState } from 'react';
import choir_concert from './choir_concert.jpeg';
import choir2 from './choir2.jpeg';
import choir3 from './choir3.jpeg';
import './home.css';

// Landing page
const Home = () => {
  const images = [choir_concert, choir2, choir3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
        <h1>Welcome to Melody Minded!</h1>
        <div id='concert-photos'>
        <i onClick={previousImage} className="arrow-button left-arrow" class="fa-solid fa-caret-left fa-2xl"></i>
        <img className="concert" src={images[currentImageIndex]} alt="A photo of a choral concert" />
        <i onClick={nextImage} className="arrow-button right-arrow" class="fa-solid fa-caret-right fa-2xl"></i>
        </div>
        <div id='mission'>
          <p>Melody Minded is a music theory education application for students ages 5-15 that uses quizzes to teach musical concepts.</p>
          <p>As a former Choir Director, I believe that music should be accessible to everyone, regardless of location, economic status, or skill level.</p>
          <p>Start with lesson one and work your way through the curriculum, then leave your comments and questions in the forum to connect with other users. Make sure you're practicing the concepts you learn by singing wherever and whenever you can!</p>
          <p>Click "lesson one" in the navigation bar to get started!</p>
        </div>
    </div>
  );
};

export default Home;