import React, { useState, useEffect } from 'react';
import AddComment from './addComment';
import Comment from './comment';
import './forum.css';

// Full forum page
const Forum = (props) => {
  // Holds all comments
  const [comments, setComments] = useState([]);

  // Gets just the timestamps of the comments
  let filtered = comments.filter((comment) => {
    return comment.datetime;
  });

  // Sorts comments by timestamp, with most recent comment at top of page
  const sortedByDate = filtered.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  // Fetches all comments from /comments table
  const loadComments = () => {
    fetch(`/comments`)
      .then((response) => response.json())
      .then((comments) => {
        setComments(comments)
      });
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className='forum-container'>
        <h1>Forum</h1>
        {/* Lets user add a comment */}
        <AddComment loadComments={loadComments} comments={comments} user={props.user} />
        {/* Returns all comments and the user who posted it */}
        {sortedByDate.map((comment, index) => {
          return (
            <div key={index}>
              <Comment comment={comment} />
            </div>
          )
        })}
    </div>
  );
};

export default Forum;