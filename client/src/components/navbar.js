import React from 'react';
import { useState, useEffect } from 'react';

const Navbar = () => {
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
        <h2>Navbar is present</h2>
        {/* TODO: route buttons to lesson pages/forum page */}
        {lessons.map((lesson) => {
            return (
                <button key={lesson.id}>
                    <p>{lesson.title}</p>
                </button>
            )
        })}        
        <button>Forum</button>
    </div>
  );
};

export default Navbar;