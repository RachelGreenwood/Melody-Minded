import React from 'react';
import Header from './header.js';
import Listen from './listen.js';
import Section from './section.js';
import Next from './next.js';
import { useState, useEffect } from 'react';

const Lesson = () => {
    const [lessons, setLessons] = useState([]);

    const loadLessons = () =>{
        // A function to fetch the list of students that will be load anytime that list change
        fetch("/lessons")
          .then((response) => response.json())
          .then((lessons) => {
                setLessons(lessons);
                console.log(lessons)
              });
      }

      useEffect(() => {
        loadLessons();
      }, []);

  return (
    <div>
        <h2>Lesson is present</h2>
        <Header lessons={lessons} />
        <Listen />
        <Section lessons={lessons} />
        <Next />
    </div>
  );
};

export default Lesson;