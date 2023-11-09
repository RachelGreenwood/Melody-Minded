import React from 'react';
import './comment.css';

// Each individual comment
const Comment = (props) => {
  const { comment } = props;
  // Sets timestamp as date and time in human-readable format
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
      {/* If the avatar has loaded, use specific styling for spacing, so page doesn't look weird if avatar doesn't load properly */}
        <img className={comment.avatar ? 'avatars' : ''} src={comment.avatar} alt="User's avatar"></img>
        <p className={comment.avatar ? 'poster' : ''}>{comment.poster}</p>
        <p className={comment.avatar ? 'timestamp' : ''}>{date}</p>
        <p className='comment-text'>{comment.comment}</p>
    </div>
  );
};

export default Comment;