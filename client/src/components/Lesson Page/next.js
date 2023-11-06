import React from 'react';
import { Link } from 'react-router-dom';
import './next.css';

// Links to next lesson, or to forum if on last lesson
const Next = (props) => {
  // Gets number of total lessons
  const lessonsLength = [...new Set(props.lesson.map((lesson) => lesson.title))].length;
  // Gets number of nnext lesson's id
  const nextLessonId = parseInt(props.lessonId) + 1;
  
  return (
    <div>
        {/* If there are more lessons, link to next lesson */}
        {nextLessonId === lessonsLength ? (
        <button id='next'><Link className='link' to={`/lessons/${nextLessonId}`}>Next Lesson</Link></button>
      ) : (
        // If on the last lesson, link to forum page
        <button id='next'><Link className='link' to={`/forum`}>Forum</Link></button>
      )}
    </div>
  );
};

export default Next;