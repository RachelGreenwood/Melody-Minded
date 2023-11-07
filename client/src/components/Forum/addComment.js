import React, { useRef, useEffect } from 'react';

// Lets user add a comment
const AddComment = (props) => {
  const userComment = useRef();
  console.log(props);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = props.user.nickname;
    const commentEvent = {poster: user, datetime: new Date(), comment: userComment.current?.value}
    handlePostRequest(commentEvent);
  }

  const handlePostRequest = (data) => {
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then(() => {
      props.loadComments();
    });
    userComment.current.value = '';
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