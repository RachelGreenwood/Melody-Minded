import React from 'react';
import { Link } from 'react-router-dom';
// Not necessary for project until there are multiple lesson pages
const Next = (props) => {
  const lessonsLength = [...new Set(props.lesson.map((lesson) => lesson.title))].length;
  const nextLessonId = parseInt(props.lessonId) + 1;
  return (
    <div>
        {/* If there are more lessons, link to next lesson */}
        {nextLessonId === lessonsLength ? (
        <button><Link style={{textDecoration: "none"}} to={`/lessons/${nextLessonId}`}>Next Lesson</Link></button>
      ) : (
        // If on the last lesson, link to forum page
        <button><Link style={{textDecoration: "none"}} to={`/forum`}>Forum</Link></button>
      )}
    </div>
  );
};

export default Next;