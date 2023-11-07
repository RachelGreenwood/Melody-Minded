import React from 'react';

// Each individual comment
const Comment = (props) => {
  const { comment } = props;
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
    <div>
        <p>{comment.poster}</p>
        <p>{date}</p>
        <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;