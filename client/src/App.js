import "./App.css";
import Profile from "./components/Authentication/profile";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/Authentication/loading";
import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthenticationButton from './components/Authentication/authentication-button';
import Navbar from './components/Home Page/navbar.js';
import Lesson from './components/Lesson Page/lesson.js';
import Forum from "./components/Forum/forum";
import Home from "./components/Home Page/home";

function App() {
  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <h2> Welcome to Melody Minded! </h2>
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