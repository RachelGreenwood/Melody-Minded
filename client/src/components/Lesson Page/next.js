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
        <Link to={`/lessons/${nextLessonId}`}>Next Lesson</Link>
      ) : (
        // If on the last lesson, link to forum page
        <Link to={`/forum`}>Forum</Link>
      )}
    </div>
  );
};

export default Next;