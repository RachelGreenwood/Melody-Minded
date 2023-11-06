import React from 'react';

// Shows lesson title
const Header = (props) => {
  // Gets all unique lesson titles
  const uniqueTitles = [...new Set(props.lesson.map((lesson) => lesson.title))];

  return (
    <div>
      {/* Shows title of this lesson */}
      <h1 style={{marginTop: 12}}>{uniqueTitles}</h1> 
    </div>
  );
};

export default Header;