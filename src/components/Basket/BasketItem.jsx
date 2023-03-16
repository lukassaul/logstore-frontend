import React, { useContext } from "react";
import Buttons from "../Buttons/Buttons";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ContextProvider";
//import allProducts from "../../Data";

export default function BasketItem(props) {
  const { state } = useContext(ProductContext);

  const product = state.allProducts.find((product) => product._id === props._id);
  console.log("basketItem props id: ", props)
  return (
    <>
      <div className="basket_item">
        <Link className="basket_link" to={`/${props._id}`}>
          <div className="basket_img">
            <img src={props.image} alt="basket_item" />
          </div>
          <div className="basket_content">
            <span className="basket_title">{props.title}</span>
            <span>{(props.price * props.count).toLocaleString()} USD</span>
          </div>
        </Link>
        <div className="basket_counter">
          <Buttons {...props} />
          {product.totalQty === 0 ? <p className="errFont fs-12px">Sold out</p> : null}
          {props.count > product.totalQty && product.totalQty !== 0 ? <p className="errFont fs-12px">Available stock: {product.totalQty}. Please adjust your order</p> : null}
        </div>
      </div>
    </>
  );
}
