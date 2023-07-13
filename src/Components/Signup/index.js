import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { setDoc } from "firebase/firestore";

const Signup = () => {
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const { pseudo, email, password, confirmPassword } = loginData;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return setDoc(user(authUser.user.uid), {
          pseudo,
          email,
        });
      })
      .then((user) => {
        setLoginData({ ...data });
        navigate("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  // gestion des erreurs

  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              <h2>Inscription</h2>
              {errorMsg}
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="text"
                  id="pseudo"
                  autoComplete="off"
                  value={pseudo}
                  required
                />
                <label htmlFor="pseudo"> Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  required
                />
                <label htmlFor="email"> Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  required
                />
                <label htmlFor="password"> Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  value={confirmPassword}
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
