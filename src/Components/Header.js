import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./profile.png";
import swal from "@sweetalert/with-react";
import axios from "axios";
import "./Header.css";
export default function Header() {
  let Merchant = "";
  const userDetails = sessionStorage.getItem("setToken");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth) {
      const user = sessionStorage.getItem("setDetails");
      setUser(JSON.parse(user));
      setAuth(true);
      setLoading(false);
      console.log(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    setAuth(false);
    sessionStorage.removeItem("setDetails");
    sessionStorage.removeItem("setToken");
    sessionStorage.setItem("isAuth", false);
  };

  const handleClick1 = () => 
    axios
      .get("https://ppay-backend-production.up.railway.app/api/user/getUser", {
        headers: { Authorization: `Bearer ${userDetails}` },
      })
      .then((res) => {
        console.log(res);
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "ENT"
        ) {
          Merchant = "Merchant Type: ENTERTAINMENT";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "FB"
        ) {
          Merchant = "Merchant Type: FOOD AND BEVERAGES";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "GS"
        ) {
          Merchant = "Merchant Type: GROCERY STORE";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "HF"
        ) {
          Merchant = "HEALTH AND FITNESS";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "OTH"
        ) {
          Merchant = "Merchant Type: OTHER";
        }
        swal(
          <div>
            <h3>Details</h3>
            <p>
              Name: {res.data.firstName} {res.data.lastName}
            </p>
            <p>Balance: {res.data.balance}</p>
            <p>Mobile Number: {res.data.mobile}</p>
            <p>Role: {res.data.role}</p>
            <p>{Merchant}</p>
          </div>
        );
      })
      .catch((err) => {
        console.log("Error:", err);
        swal({
          text: err.response.data,
          icon: "warning",
        });
      });
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          Ppay
        </Link>
        <div  id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            {auth ? (
              <>
                <div className="right">
                  <h2>
                    {!loading &&
                      (user !== null ? (
                        <img
                          className="d-inline-block align-text-top"
                          width="40"
                          height="44"
                          src={Profile}
                          onClick={handleClick1}
                          alt="#"
                        />
                      ) : (
                        ""
                      ))}
                    <button onClick={handleLogout} className="btn btn-primary">
                      LogOut
                    </button>
                  </h2>
                </div>
              </>
            ) : (
              <div>
                <Link
                  to="/LogIn"
                  className="nav-link active"
                  aria-current="page"
                  style={{ color: "white" }}
                >
                  Log In
                </Link>
                <Link
                  to="/SignUp"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
