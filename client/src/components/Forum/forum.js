import React, { useState, useEffect } from 'react';
import AddComment from './addComment';
import Comment from './comment';

const Forum = () => {
  const [comments, setComments] = useState([]);
  const loadComments = () => {
    fetch(`/comments`)
      .then((response) => response.json())
      .then((comments) => {
        setComments(comments)
        console.log(comments);
      });
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div>
        <p>Forum is present</p>
        {comments.map((comment, index) => {
          return (
            <div key={index}>
              {comment.poster}
              {comment.comment}
            </div>
          )
        })}
        <AddComment />
        <Comment />
    </div>
  );
};

export default Forum;