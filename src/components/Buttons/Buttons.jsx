import React, { useContext, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { PostLockProductAPI } from "../../api/lockProduct";
import { PostUnlockProductAPI } from "../../api/unlockProduct";

export default function Buttons(props) {
  
  const { dispath } = useContext(ProductDispath);
  const { state } = useContext(ProductContext);
  const { _id, totalQty, cartId } = props;
  const countItem = state.basket.find((product) => product._id === _id);

  const [maxError, setMaxError] = useState(false)

  // console.log("button props: ", props)
  // console.log("button basket: ", state.basket)
  // console.log("button countItem: ", countItem)

  /*
    Checks the item count in the basket if against the
    available stock of the product selected
    If the available stock is greater than the product item count,
    increase the product count
    If not, do not let the user to increase product quantity
  */
  const checkProductCount = () => {
    if(totalQty > countItem.count) {
      dispath({ type: "INCREASE", payload: cartId })
      let lockData = [{
        productId: _id,
        size: null,
        quantity: 1
      }]
      try {
        PostLockProductAPI({product: lockData})
      }catch(e) {
        console.log("Error in locking item")
      }
    } else {

    }
  }

  const unlockProductCount = () => {
    //dispath({ type: "DECREASE", payload: _id })
    let lockData = [{
      productId: _id,
      size: null,
      quantity: 1
    }]
    try {
      PostUnlockProductAPI({product: lockData})
    }catch(e) {
      console.log("Error in unlocking item")
    }
  }

  return (
    <div className="basket_buttons">
      <span
        onClick={() => checkProductCount()}
        className="basket_plus"
      >
        <AiOutlinePlus />
      </span>
      <span className="counter_number">{props && props.count}</span>
      {props && props.count === 1 ? (
        <span
          onClick={() => {
            dispath({ type: "REMOVE_FROM_BASKET", payload: cartId })
            unlockProductCount()
          }}
          className="basket_minus"
        >
          <RiDeleteBinLine />
        </span>
      ) : (
        <span
          onClick={() => {
            dispath({ type: "DECREASE", payload: cartId })
            unlockProductCount()
          }}
          className="basket_minus"
        >
          <AiOutlineMinus />
        </span>
      )}
    </div>
  );
}
