import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo.png';
import './navbar.css';

// Navigate to different pages
const Navbar = () => {
  const [lessons_new, setLessons_New] = useState([]);
  console.log(lessons_new)
  
  // Fetches data of all lessons
  const loadLessons_New = () => {
    fetch("/lessons_new")
      .then((response) => response.json())
      .then((lessons_new) => {
        console.log("Fetched lessons: ", lessons_new)
        setLessons_New(lessons_new);
      });
  }
  
  useEffect(() => {
    loadLessons_New();
  }, []);
  
  // Gets rid of duplicates and sorts by id
  const uniqueLessons = lessons_new.reduce((unique, lesson) => {
    return unique.some(item => item.id === lesson.id) ? unique : [...unique, lesson];
  }, []).sort((a, b) => a.id - b.id);
  

  return (
        <nav>
          <img src={Logo} alt='Melody Minded logo'></img>
          <ul>
            <li><Link className='link' to="/"><div>Home</div></Link></li>
            {/* Displays all lesson titles as links to each lesson */}
            {uniqueLessons.map((lesson) => (
              <li key={lesson.id}>
                <Link className='link' to={`/lessons/${lesson.id}`}><div>{lesson.id + ": " + lesson.title}</div></Link>
              </li>
            ))}
            <li><Link className='link' to="/forum"><div>Forum</div></Link></li>
          </ul>
        </nav>
  );
};

export default Navbar;
