import React from 'react';

const Header = (props) => {
  return (
    <div>
        <h2>Header is present</h2>
        {/* Shows lesson title */}
        {props.lessons.map((lesson) => {
            return (
                <p key={lesson.id}>Lesson title: {lesson.title}</p>
            )
        })}  
    </div>
  );
};

export default Header;