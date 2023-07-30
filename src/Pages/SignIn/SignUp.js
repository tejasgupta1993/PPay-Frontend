import React, { useState } from "react";
import "./SignIn.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
function SignUp() {
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    firstnameError: "",
    lastnameError: "",
    mobileError: "",
    passwordError: "",
    confirmpasswordError: "",
    mobileLengthError: "",
    passwordLengthError: "",
    roleError: "",
    merchantTypeError: "",
  });
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
    matchingPassword: "",
    role: "",
    merchantType: "",
  });
  let history = useHistory();
  const handleChange = (e) => {

    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signupValidate = () => {
    let firstnameError = "";
    let lastnameError = "";
    let mobileError = "";
    let passwordError = "";
    let confirmpasswordError = "";
    let mobileLengthError = "";
    let passwordLengthError = "";
    let roleError = "";
    let merchantTypeError = "";
    if (inputs.firstName.trim().length === 0) {
      firstnameError = "* FirstName is required";
    }
    if (inputs.lastName.trim().length === 0) {
      lastnameError = "* LastName is required";
    }
    if (inputs.mobile.trim().length === 0) {
      mobileError = "* Phone Number is required";
    }
    if (inputs.password.trim().length === 0) {
      passwordError =
        "* Password is required";
    }
    if (inputs.mobile.trim().length < 10 && inputs.mobile.trim().length > 1) {
      mobileLengthError = "* Phone Number is too small lengthens it to 10";
    }
    if (
      inputs.password.trim().length < 8 &&
      inputs.password.trim().length > 1
    ) {
      passwordLengthError =
        "* Password is too small lengthens it to 8 or more!";
    }
    if (
      inputs.matchingPassword.trim().length === 0
    ) {
      confirmpasswordError = "* Confirm Password is required";
    }
    if(inputs.role.trim().length === 0){
      roleError = "*Choose Type of user";
    }
    if (inputs.role.trim() === "MERCHANT" && inputs.merchantType.trim().length === 0){
      merchantTypeError = "Choose a Merchant Type";
    }
      if (
        firstnameError ||
        lastnameError ||
        mobileError ||
        passwordError ||
        confirmpasswordError ||
        mobileLengthError ||
        passwordLengthError ||
        roleError ||
        merchantTypeError
      ) {
        setCredential({
          firstnameError,
          lastnameError,
          mobileError,
          passwordError,
          confirmpasswordError,
          mobileLengthError,
          passwordLengthError,
          roleError,
          merchantTypeError,
        });
        return false;
      }
    return true;
  };

  const submitDetails = (e) => {
    
    e.preventDefault();
    //console.log("Rahul")
    if (signupValidate()) {
      setLoading(true);
      const details = {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        mobile: inputs.mobile,
        password: inputs.password,
        matchingPassword: inputs.matchingPassword,
        role: inputs.role,
        merchantType: inputs.merchantType,
      };
      axios
        .post("https://ppay-backend-production.up.railway.app/api/public/register", details)
        .then((response) => {
          
          if (response.status === 200) {
            setLoading(false);
            setInputs({
              firstName: "",
              lastName: "",
              mobile: "",
              password: "",
              matchingPassword: "",
              role: "",
              merchantType: "",
            });
            console.log("Response:", response);
            localStorage.setItem("mobile", inputs.mobile);
            swal({
              title: "Good job!",
              text: response.data,
              icon: "success",
            });
            history.push("/otp");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error:", err);
          swal({
            text: err.response.data,
            icon: "warning",
          });
        });
    }
  };

  return (
    <div>
      <div className="login">
        <Link to="/">
          <h1>Ppay</h1>
        </Link>

        <h1>Sign Up</h1>
        <div className="login__container">
          <form>
            <h4>Firstname</h4>
            <input
              placeholder={credential.firstnameError}
              type="text"
              className="firstname"
              name="firstName"
              onChange={handleChange}
            />
            <h4>Lastname</h4>
            <input
              placeholder={credential.lastnameError}
              type="text"
              className="lastname"
              name="lastName"
              onChange={handleChange}
            />
            <h4>Mobile Number</h4>
            <input
              placeholder={credential.mobileError}
              type="text"
              className="mobile"
              maxLength={10}
              name="mobile"
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{credential.mobileLengthError}</p>
            <h4>Password</h4>
            <input
              placeholder={credential.passwordError}
              type="password"
              className="password"
              name="password"
              minLength={8}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{credential.passwordLengthError}</p>
            <h4>Confirm Password</h4>
            <input
              placeholder={credential.confirmpasswordError}
              type="password"
              className="confirm_password"
              name="matchingPassword"
              minLength={8}
              onChange={handleChange}
            />
            <p>Type Of User:</p>
            <input
              type="radio"
              name="role"
              onChange={handleChange}
              value="USER"
            />
             <label htmlFor="html">USER</label>
            <br></br>
            <input
              type="radio"
              name="role"
              onChange={handleChange}
              value="MERCHANT"
            />
             <label htmlFor="html">MERCHANT</label>
            <p style={{ color: "red" }}>{credential.roleError}</p>
            <br></br>
            <p>Choose a Merchant Type:</p>
            <input
              type="radio"
              name="merchantType"
              onChange={handleChange}
              value="FB"
            />
             <label htmlFor="html">FOOD AND BEVERAGES</label>
            <br></br>
            <input
              type="radio"
              name="merchantType"
              onChange={handleChange}
              value="ENT"
            />
             <label htmlFor="html">ENTERTAINMENT</label>
            <br></br>
            <input
              type="radio"
              name="merchantType"
              onChange={handleChange}
              value="HF"
            />
             <label htmlFor="html">HEALTH AND FITNESS</label>
            <br></br>
            <input
              type="radio"
              name="merchantType"
              onChange={handleChange}
              value="GS"
            />
             <label htmlFor="html">GROCERY STORE</label>
            <br></br>
            <input
              type="radio"
              name="merchantType"
              onChange={handleChange}
              value="OTH"
            />
             <label htmlFor="html">OTHER</label>
            <p style={{ color: "red" }}>{credential.merchantTypeError}</p>
            <br></br>
            <button
              className="login__signInButton"
              type="submit"
              onClick={submitDetails}
              disabled={loading}
            >
              {loading ? "Loading..." : "SignUp"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
