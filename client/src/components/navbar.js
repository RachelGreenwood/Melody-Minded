import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <nav>
          <ul>
            <li><Link to="/"><button>Home</button></Link></li>
            {lessons.map((lesson, index) => (
              <li key={index}>
                <Link to={`/lessons/${index}`}><button>{lesson.title}</button></Link>
              </li>
            ))}
            <li><Link to="/forum"><button>Forum</button></Link></li>
          </ul>
        </nav>
    </div>
  );
};

export default Navbar;