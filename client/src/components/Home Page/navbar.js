import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/Users/tpl1122_2/ProjectCRUDTemplate/client/src/Logo.png';

// Navigate to different pages
const Navbar = () => {
    const [lessons_new, setLessons_New] = useState([]);

    // Fetches data of all lessons
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

// Fixes the lesson duplication problem using a Set to filter out duplicates
const uniqueTitles = [...new Set(lessons_new.map((lesson) => lesson.title))];

  return (
    <div>
        <nav>
          <img src={Logo} alt='Melody Minded logo'></img>
          <ul>
            <li><Link style={{textDecoration: 'none'}} to="/"><div>Home</div></Link></li>
            {/* Displays all lesson titles as links to each lesson */}
            {uniqueTitles.map((lesson, index) => (
              <li key={index + 1}>
                <Link style={{textDecoration: 'none'}} to={`/lessons/${index + 1}`}><div>{lesson}</div></Link>
              </li>
            ))}
            <li><Link style={{textDecoration: 'none'}} to="/forum"><div>Forum</div></Link></li>
          </ul>
        </nav>
    </div>
  );
};

export default Navbar;