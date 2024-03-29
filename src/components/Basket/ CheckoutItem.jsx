import React from "react";
import Buttons from "../Buttons/Buttons";
import { Link } from "react-router-dom";

export default function CheckoutItem(props) {
  return (
    <div className="basket_item">
      <Link className="basket_link" to={`/${props._id}`}>
        <div className="basket_img">
          <img src={props.image} alt="basket_item" />
        </div>
        <div className="basket_content">
          <span className="basket_title">{props.title} {props.size ? `- ${props.size}` : null}</span>
          <span>{(props.price * props.count).toLocaleString()} LOG</span>
          <span className="smText">Quantity: {props.count}</span>
        </div>
      </Link>
    </div>
  );
}
