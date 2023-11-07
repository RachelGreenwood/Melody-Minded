import React, { useState, useEffect } from 'react';
import AddComment from './addComment';
import Comment from './comment';

// Full forum page
const Forum = () => {
  // Holds all comments
  const [comments, setComments] = useState([]);
  let filtered = comments.filter((comment) => {
    return comment.datetime;
  });
  // console.log(filtered);
  const sortedByDate = filtered.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

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
        {sortedByDate.map((comment, index) => {
          return (
            <div key={index}>
              <Comment comment={comment} />
            </div>
          )
        })}
        <AddComment />
    </div>
  );
};

export default Forum;