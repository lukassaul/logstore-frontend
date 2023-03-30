import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { HiArrowRight } from "react-icons/hi";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import BasketItem from "./BasketItem";
import Offer from "./Offer";
import OfferBadge from "./OfferBadge";
import SendProducts from "./SendProducts";
import { PostUnlockProductAPI } from "../../api/unlockProduct";


export default function Basket() {
  const { state } = useContext(ProductContext);
  const { dispath } = useContext(ProductDispath);
  const navigate = useNavigate()

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
                Shipping fee is already included in the total price.
              </span>
            </div>
          </div>
        )}
      </div>
      {state.basket.length > 0 ? (
        <div className="basket_container">
          <div className="basket_itemBox">
            {state.basket.map((product) => (
              <BasketItem key={product.cartId} {...product} />
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
                <span>{state.totalPriceAfterOffer.toLocaleString()} LOG</span>
              </div>
            )}
            <SendProducts />
            <div className="basket_send">
              <span>Total amount payable</span>
              <span>{state.totalPriceFinal.toLocaleString()} LOG</span>
            </div>

            <button 
              className="basket_button_buy"
              onClick={() => navigate('/checkout')}
            >
              Continue the purchase process
            </button>

            <button
              onClick={() => {
                dispath({ type: "EMPTY_BASKET" })
                let data = state.basket.map(item => {
                  return { productId: item._id, size: item.size, quantity: item.count}
                })
                try {
                  PostUnlockProductAPI({product: data})
                }catch(e) {
                  console.log("error posting unlock product: ", e)
                }
              }}
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
            src="images/empty-basket.gif"
            alt=""
          />
          <span className="favorite_empty_title">The shopping cart is empty</span>
        </div>
      )}
    </>
  );
}
