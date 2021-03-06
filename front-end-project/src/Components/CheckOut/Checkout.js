import "./CheckOut.css";
import { useState } from "react";
import { Link, Switch, Route, BrowserRouter, useParams } from "react-router-dom";
import CashOnDelivery from "./CashOnDelivery";
import Paypal from "./Paypal";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const CheckOut = () => {

  let { TotalPrice } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="checkout-section container py-3">
      <h2> Choose your preferred payment method </h2>

      <div className="row">

        <div className="col-3">
          <ul className="list-unstyled payment-options ">
            {/* <li className="mb-4 mt-2" >
              <Link to="/checkout/cashOnDelivery">Cash On Delivery </Link>
            </li> */}
            <li className="mb-4 mt-2">
              <Link to="/checkout/paypal">Pay with Paypal</Link>
            </li>
          </ul>
        </div>

        <div className="col">
          <Route
            path="/checkout/cashOnDelivery"
            component={CashOnDelivery}
          />
          <Route path="/checkout/paypal" component={Paypal} />
        </div>

      </div>
    </div>
  );
};

export default CheckOut;