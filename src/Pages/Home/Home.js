import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import Bank from "./bank.png";
import Wallet from "./wallet.png";
import Payment from "./payment-method.png";
import AddMoney from "./add.png";
import Analytics from "./analytics.png";
import Deposit from "./deposit.png"
export default function Home() {
  
  return (
    <div>
      <div className="home">
        <Link to="/PayNow" className="link1">
          <div className="zoom">
            <img className="images" src={Payment} alt="" />
            <button className="btn btn-primary btn-xl2">PayNow</button>
          </div>
        </Link>
        <Link to="/AddMoney" className="link1">
          <div className="zoom">
            <img className="images" src={AddMoney} alt="" />
            <button className="btn btn-primary btn-xl3">AddMoney</button>
          </div>
        </Link>
      </div>
      <div className="home">
        <Link to="/Bank" className="link1">
          <div className="zoom">
            <img className="images" src={Bank} alt="" />
            <button className="btn btn-primary btn-xl1">Bank</button>
          </div>
        </Link>
        <Link to="/Balance" className="link1">
          <div className="zoom">
            <img className="images" src={Wallet} alt="" />
            <button className="btn btn-primary btn-xl4">Balance</button>
          </div>
        </Link>
      </div>
      <div className="home">
        <Link to="/ExpenseAnalytics" className="link1">
          <div className="zoom">
            <img className="images" src={Analytics} alt="" />
            <button className="btn btn-primary btn-xl5">
              Expense Analytics
            </button>
          </div>
        </Link>
        <Link to="/SendMoneyToBank" className="link1">
          <div className="zoom">
            <img className="images" src={Deposit} alt="" />
            <button className="btn btn-primary btn-xl6">
              Send Money To Bank
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
