import React, { useRef } from 'react';
import './addComment.css';

// Lets user add a comment
const AddComment = (props) => {
  const userComment = useRef();
  console.log(props);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = props.user.nickname;
    const avatar = props.user.picture;
    const commentEvent = {poster: user, datetime: new Date(), comment: userComment.current?.value, avatar: avatar}
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
          <h3>Add a Comment!</h3>
          <input type='text' ref={userComment} required></input>
          <button className='submit' type='submit'>Submit</button>
        </form>
    </div>
  );
};

export default AddComment;