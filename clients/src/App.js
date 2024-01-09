import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Contacts from './components/Contacts';
import Regsiter from './pages/Regsiter';
import Home from './pages/Home';
import Start from './components/Start';
// import Personal from './components/Personal';
import Profile from './components/Profile';
import Navbar from './pages/Navbar';

const Id = process.env.REACT_APP_CLIENT_ID;
function App() {
  return (
    <div className="bg-[#F8F4EA]">
      <GoogleOAuthProvider clientId={Id}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Regsiter />} />
            <Route exact path="/chats" element={<Home />} />
            {/* <Route exact path="/group" element={<Contacts />} />
          <Route exact path="/personal" element={<Personal />} /> */}
            <Route exact path="/" element={<Start />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
