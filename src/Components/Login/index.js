import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Btn, setBtn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (Btn) {
      setBtn(false);
    }
  }, [password, email, Btn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //  connexion email et password avec une redirection vers la page welcome
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        navigate("/welcome", { replace: true });
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              <h2>Connexion</h2>
              {error !== "" && <span>{error.message}</span>}
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                  value={email}
                />
                <label htmlFor="email"> Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                  value={password}
                />
                <label htmlFor="password"> Mot de passe</label>
              </div>

              {<button disabled={Btn ? false : true}>Connexion</button>}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/Signup">
                Nouveau sur Marvel Quiz? Inscrivez-vous maintenant.
              </Link>

              <div>
                <br />
                <Link className="simpleLink" to="/forgetpassword">
                  Mot de passe oublié? Récupérez le ici.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
