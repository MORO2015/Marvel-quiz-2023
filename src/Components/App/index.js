import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../../App.css";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcom from "../Welcom";
import Login from "../Login";
import Signup from "../Signup";
import ForgetPassword from "../ForgetPassworld";
import ErrorPage from "../Errorpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
