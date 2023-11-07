import React, { useRef } from 'react';

// Lets user add a comment
const AddComment = (props) => {
  const userComment = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = props.poster;
    const commentEvent = {user: user, datetime: new Date(), comment: userComment.current?.value}
    handlePostRequest(commentEvent);
    console.log("In submit", commentEvent)
  }

  const handlePostRequest = (data) => {
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }
  
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input type='text' ref={userComment} required></input>
          <button type='submit'>Submit</button>
        </form>
    </div>
  );
};

export default AddComment;