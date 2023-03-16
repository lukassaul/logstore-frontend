import React, { useContext } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";

export default function Buttons(props) {
  console.log("button props: ", props)
  const { dispath } = useContext(ProductDispath);
  const { state } = useContext(ProductContext);
  const { _id, totalQty } = props;
  const countItem = state.basket.find((product) => product._id === _id);

  /*
    Checks the item count in the basket if against the
    available stock of the product selected
    If the available stock is greater than the product item count,
    increase the product count
    If not, do not let the user to increase product quantity
  */
  const checkProductCount = () => {
    if(totalQty > countItem.count) dispath({ type: "INCREASE", payload: _id })
  }

  return (
    <div className="basket_buttons">
      <span
        onClick={() => checkProductCount()}
        className="basket_plus"
      >
        <AiOutlinePlus />
      </span>
      <span className="counter_number">{countItem.count}</span>
      {countItem.count === 1 ? (
        <span
          onClick={() => dispath({ type: "REMOVE_FROM_BASKET", payload: _id })}
          className="basket_minus"
        >
          <RiDeleteBinLine />
        </span>
      ) : (
        <span
          onClick={() => dispath({ type: "DECREASE", payload: _id })}
          className="basket_minus"
        >
          <AiOutlineMinus />
        </span>
      )}
    </div>
  );
}
