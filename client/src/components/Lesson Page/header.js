import React from 'react';

const Header = (props) => {
  return (
    <div>
        <h2>Header is present</h2>
        {/* Shows lesson title */}
        {props.lesson.map((lesson, index) => {
            return (
                <h1 key={index}>Lesson title: {lesson.title}</h1>
            )
        })}  
    </div>
  );
};

export default Header;