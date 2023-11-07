import React from 'react';

// Lets user add a comment
const AddComment = () => {
  
  return (
    <div>
        <form>
          <input type='text' required></input>
          <button type='submit'>Submit</button>
        </form>
    </div>
  );
};

export default AddComment;