import React from 'react';

const Header = (props) => {
  return (
    <div>
        {/* Shows lesson title */}
        {props.lesson.map((lesson, index) => {
            return (
                <h1 key={index}>{lesson.title}</h1>
            )
        })}  
    </div>
  );
};

export default Header;