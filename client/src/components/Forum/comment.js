import React from 'react';
import './comment.css';

// Each individual comment
const Comment = (props) => {
  const { comment } = props;
  console.log(comment.avatar);
  const date = comment.datetime
    ? new Date(comment.datetime).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : "";
  
  return (
    <div className='each-comment'>
        <img src={comment.avatar}></img>
        <p>{comment.poster}</p>
        <p className='timestamp'>{date}</p>
        <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;