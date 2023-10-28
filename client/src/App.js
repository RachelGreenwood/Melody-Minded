import "./App.css";
import Profile from "./components/profile";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthenticationButton from './components/authentication-button';
import Navbar from './components/navbar.js';
import Lesson from './components/lesson.js';
import Forum from "./components/forum";
import Home from "./components/home";

function App() {

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [lessons, setLessons] = useState([]);

  // Fetches data from users table to test connection
  const loadUsers = () =>{
    fetch("/users")
      .then((response) => response.json())
      .then((users) => {
            setUsers(users);
          });
  }

  // Fetches data from comments table to test connection
  const loadComments = () =>{
    fetch("/comments")
      .then((response) => response.json())
      .then((comments) => {
            setComments(comments);
          });
  }

  // Fetches data from lessons table to test connection
  const loadLessons = () =>{
    fetch("/lessons")
      .then((response) => response.json())
      .then((lessons) => {
            setLessons(lessons);
          });
  }

  useEffect(() => {
    loadUsers();
    loadComments();
    loadLessons();
  }, []);

  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <h2> Welcome to Melody Minded! </h2>
      {/* <p>Data from users table: {users[0].username}</p>
      <p>Data from comments table: {comments[0].comment}</p>
      <p>Data from lessons table: {lessons[0].title}</p> */}
      <AuthenticationButton />
      <Navbar />
      <div className="container flex-grow-1">
      {!user ? <span>Hello from Techtonica From DEV!!!</span> : <span>Hello <Link to="api/me">{user.name}</Link></span> }
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/me" element={<Profile user={user}/>} />
        <Route path="lessons/:lessonId" element={<Lesson />} />
        <Route path='/forum' element={<Forum />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;