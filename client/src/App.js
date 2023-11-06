import "./App.css";
import Profile from "./components/Authentication/profile";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/Authentication/loading";
import { Route, Routes, Link } from 'react-router-dom';
import AuthenticationButton from './components/Authentication/authentication-button';
import Navbar from './components/Home Page/navbar.js';
import Lesson from './components/Lesson Page/lesson.js';
import Forum from "./components/Forum/forum";
import Home from "./components/Home Page/home";

function App() {
  // Loading symbol
  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container d-flex flex-column h-100">
      <div className="navbar-grid">
        <Navbar />
      </div>
      <div className="lesson-grid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="api/me" element={<Profile user={user}/>} />
          <Route path="lessons/:lessonId" element={<Lesson />} />
          <Route path='/forum' element={<Forum />} />
        </Routes>
      </div>
      <div className="last-column">
        {/* User info and sign-in button */}
        <div className="user-info">
        {!user ? "" : (
          <>
            <img className="avatar" src={user.picture} alt='user avatar' />
            <span className="auth"><Link className="link" to="api/me">{user.nickname}</Link></span>
          </>
        )}
        <AuthenticationButton />
        </div>
      </div>
    </div>
  );
}

export default App;