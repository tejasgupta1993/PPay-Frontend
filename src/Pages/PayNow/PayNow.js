import React, {useState} from 'react'
import axios from 'axios';
import swal from "sweetalert";
import './PayNow.css'
import { Link } from 'react-router-dom';
export default function PayNow() {
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    amountError: "",
    ridError: "",
  });
  const [data, setData] = useState({
    rid: "",
    amount: "",
    
  });

  let user = (sessionStorage.getItem("setToken"));



  const handleChange = (e) => {
    //console.log(inputs);
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    //console.log(inputs.sid);
    //console.log(inputs.rid);
    //console.log(inputs.amount);
  };

  const payNowValidate = () => {
    let ridError = "";
    let amountError = "";

    if (data.amount.trim().length === 0) {
      amountError = "* Amount is required";
    }
    if (data.rid.trim().length === 0) {
      ridError = "*Mobile Number is required";
    }

    if (amountError || ridError) {
      setCredential({
        amountError,
        ridError,
      });
      return false;
    }
    return true;
  };

  const submitDetails = (e) => {
    setLoading(true);
    //e.preventDefault();
    if(payNowValidate()){
      const details = {
        amount: data.amount,
        rid: data.rid,
      };

      console.log(user);
      axios
        .post("https://ppay-backend-production.up.railway.app/api/user/sendMoney", details, {
          headers: { Authorization: `Bearer ${user}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setData({
              rid: "",
              amount: "",
            });
            console.log("Response:", response);
            swal({
              title: "Good job!",
              text: "Payment Successfull",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          //setRep(err.response.data);
          console.log("Error:", err);
          swal({
            text: err.response.data,
            icon: "warning",
          });
        });
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="paynow">
        <Link to="/">
          <h1>Ppay</h1>
        </Link>
        <div className="paynow__container">
          <h1>Pay Now</h1>
          <form>
            <h3>Mobile Number</h3>
            <input type="text" name="rid" onChange={handleChange} />
            <p style={{ color: "red" }}>{credential.ridError}</p>
            <h3>Amount</h3>
            <input type="text" name="amount" onChange={handleChange} />
            <p style={{ color: "red" }}>{credential.amountError}</p>
            <button
              type="submit"
              className="paynow__signInButton"
              onClick={submitDetails}
              disabled={loading}
            >
              {loading ? "Loading..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
