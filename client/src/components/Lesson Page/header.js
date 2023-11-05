import React from 'react';

const Header = (props) => {
  const uniqueTitles = [...new Set(props.lesson.map((lesson) => lesson.title))];

  return (
    <div>
      <h1>{uniqueTitles}</h1> 
    </div>
  );
};

export default Header;