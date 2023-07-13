import React, { Fragment, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcom = () => {
  const [userSession, setUserSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listner = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });

    return listner();
  }, []);

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p>Loading ...</p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  );
};

export default Welcom;
