import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (check) {
      signOut(auth)
        .then(() => {
          console.log("Vous etres déconnecté");
          //   fonction permetant de rediger l'utilusateur vers la page welcome apres 2 seconds
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          console.log("Oupd, nous avons une erreur!");
        });
    }
  }, [check, navigate]);

  const handleChange = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={check} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Logout;
