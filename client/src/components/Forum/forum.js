import React, { useState, useEffect } from 'react';
import AddComment from './addComment';
import Comment from './comment';

// Full forum page
const Forum = () => {
  // Holds all comments
  const [comments, setComments] = useState([]);

  // Fetches all comments from /comments table
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
        {/* Returns all comments and the user who posted it */}
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