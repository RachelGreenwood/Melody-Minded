import React from 'react';

// Each individual comment
const Comment = (props) => {
  const { comment } = props;
  return (
    <div>
        <p>{comment.poster}</p>
        <p>{comment.datetime}</p>
        <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;