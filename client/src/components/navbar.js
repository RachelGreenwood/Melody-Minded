import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/Users/tpl1122_2/ProjectCRUDTemplate/client/src/Logo.png';

// Navigate to different pages
const Navbar = () => {
    const [lessons_new, setLessons_New] = useState([]);

    const loadLessons_New = () => {
      fetch("/lessons_new")
        .then((response) => response.json())
        .then((lessons_new) => {
          setLessons_New(lessons_new);
        });
    }

      useEffect(() => {
        loadLessons_New();
      }, []);

  return (
    <div>
        <h2>Navbar is present</h2>    
        <nav>
          <img src={Logo} alt='Melody Minded logo'></img>
          <ul>
            <li><Link to="/"><button>Home</button></Link></li>
            {/* Displays all lesson titles as links to each lesson */}
            {lessons_new.map((lesson, index) => (
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