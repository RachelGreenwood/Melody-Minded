import React from 'react';

const Header = (props) => {
  return (
    <div>
        <h2>Header is present</h2>
        {/* Shows lesson title */}
        {props.lesson.map((lesson, index) => {
            return (
                <p key={index}>Lesson title: {lesson.title}</p>
            )
        })}  
    </div>
  );
};

export default Header;