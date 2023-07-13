import React, { useState } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  console.log(email);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(null);
        setSuccess(
          `Consultez votre mail: ${email} pour changer le mot de passe`
        );
        setEmail("");

        setTimeout(() => {
          navigate("/login");
        }, 6000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };
  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              <h2>Mot de passe oublié ?</h2>
              {error && <span>{error.message}</span>}
              {success && (
                <span
                  style={{
                    color: "bg(256, 256, 256)",
                    border: "1px solid",
                    borderColor: "green",
                  }}
                >
                  {success}
                </span>
              )}
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  required
                />
                <label htmlFor="email"> Email</label>
              </div>
              <button disabled={disabled}>Recupéré</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déja inscrit? Connectez-vous ici.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
