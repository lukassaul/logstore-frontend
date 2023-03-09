import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';
//import WebSocket from 'ws';

import { HiArrowRight } from "react-icons/hi";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import BasketItem from "./BasketItem";
import Offer from "./Offer";
import OfferBadge from "./OfferBadge";
import SendProducts from "./SendProducts";


export default function Basket() {
  const { state } = useContext(ProductContext);
  const { dispath } = useContext(ProductDispath);
  const navigate = useNavigate()

  // const socket = new WebSocket('wss://twigchain.com:4000/payment?address=WfyjGnu2i7xR5oiPMxb7rSE5WwcKD5btzD')

  // socket.addEventListener('open', function(event){
  //   console.log('connected to ws server')
  // })

  // socket.addEventListener('message', function(event){
  //   console.log('message from server: ', event.data)
  // })

  return (
    <>
      <div className="favorite_container_linkBar">
        <div className="favorite_linkBar">
          <span>Shopping cart</span>
          <Link className="favorite_backLink" to={"/products"}>
            <HiArrowRight />
              Products page
          </Link>
        </div>
        {state.basket.length > 0 && (
          <div className="favorite_linkBar">
            <div className="free_send_title">
              <img src="images/sound(1).jpg" alt="" />
              <span>
                Shipping is free for purchases over 1000 USD.
              </span>
            </div>
          </div>
        )}
      </div>
      {state.basket.length > 0 ? (
        <div className="basket_container">
          <div className="basket_itemBox">
            {state.basket.map((product) => (
              <BasketItem key={product.id} {...product} />
            ))}
          </div>
          <div className="basket_priceBox">
            <div className="basket_price">
              <span>Order Summary</span>
              <span>|</span>
              <span>{state.basket.length} items</span>
            </div>
            {state.totalPriceAfterOffer > 0 && (
              <div className="basket_offer">
                <span>Discounted Price</span>
                <span>{state.totalPriceAfterOffer.toLocaleString()} USD</span>
              </div>
            )}
            <SendProducts />
            <div className="basket_send">
              <span>Total amount payable</span>
              <span>{state.totalPriceFinal.toLocaleString()} USD</span>
            </div>

            <button 
              className="basket_button_buy"
              onClick={() => navigate('/checkout')}
            >
              Continue the purchase process
            </button>

            <button
              onClick={() => dispath({ type: "EMPTY_BASKET" })}
              className="basket_button_remove"
            >
              Remove {state.basket.length} item from the shopping cart
            </button>

          </div>
        </div>
      ) : (
        <div className="favorite_empty">
          <img
            className="favorite_empty_img"
            src="images/empty-cart.png"
            alt=""
          />
          <span className="favorite_empty_title">The shopping cart is empty</span>
        </div>
      )}
    </>
  );
}
