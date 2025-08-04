import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignupForm from './Component/Auth/SignupForm';
import Login from './Component/Auth/LoginFormBolt';
import Home from './Component/Home/home';
import QR from './Component/Home/QR';
import Profile from './Component/Home/Profile';
// import Navbar from './Component/Home/Navbar';
import HomeLayout from './HomeLayout';


function App() {
  return (
    <>
    <Router>
      <div className="content">
        <Routes>
          <Route path="/auth/signup" element={<SignupForm />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeLayout><Home /></HomeLayout>} />
          <Route path="/home/qr" element={<HomeLayout><QR /></HomeLayout>} />
          <Route path="/home/profile" element={<HomeLayout><Profile /></HomeLayout>} />
        </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
