import React from 'react';
import Header from './header.js';
import Listen from './listen.js';
import Section from './section.js';
import Next from './next.js';

const Lesson = () => {
  return (
    <div>
        <p>Lesson is present</p>
        <Header />
        <Listen />
        <Section />
        <Next />
    </div>
  );
};

export default Lesson;