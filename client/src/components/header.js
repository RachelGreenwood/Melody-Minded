import React from 'react';

const Header = (props) => {
  return (
    <div>
        <h2>Header is present</h2>
        <p>{props.lessons[0].title}</p>
    </div>
  );
};

export default Header;