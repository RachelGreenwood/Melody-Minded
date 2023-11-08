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
        <img className={comment.avatar ? 'avatars' : ''} src={comment.avatar} alt="User's avatar"></img>
        <p className={comment.avatar ? 'poster' : ''}>{comment.poster}</p>
        <p className={comment.avatar ? 'timestamp' : ''}>{date}</p>
        <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;

// return <button className={`answer-buttons ${selectedAns === option ? 'selected' : ''}`} key={index} onClick={handleBtnClick}>{option}</button>