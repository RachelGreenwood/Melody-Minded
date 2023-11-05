import React from 'react';

const Header = (props) => {
  const uniqueTitles = [...new Set(props.lesson.map((lesson) => lesson.title))];

  return (
    <div>
      <h1 style={{marginTop: 12}}>{uniqueTitles}</h1> 
    </div>
  );
};

export default Header;