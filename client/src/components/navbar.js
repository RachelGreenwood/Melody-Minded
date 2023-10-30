import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/Users/tpl1122_2/ProjectCRUDTemplate/client/src/Logo.png';

const Navbar = () => {
    const [lessons, setLessons] = useState([]);

    const loadLessons = () =>{
      // Fetches each lesson to display all lesson titles
        fetch("/lessons")
          .then((response) => response.json())
          .then((lessons) => {
                setLessons(lessons);
              });
      }

      useEffect(() => {
        loadLessons();
      }, []);

  return (
    <div>
        <h2>Navbar is present</h2>    
        <nav>
          <img src={Logo}></img>
          <ul>
            <li><Link to="/"><button>Home</button></Link></li>
            {/* Displays all lesson titles as links to each lesson */}
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