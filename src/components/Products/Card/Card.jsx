import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Interest from "./Interest";
import { Link } from "react-router-dom";
import { ProductContext, ProductDispath } from "../../Context/ContextProvider";
import Buttons from "../../Buttons/Buttons";

export default function Card(props) {
  const { dispath } = useContext(ProductDispath);
  const { state } = useContext(ProductContext);

  const datas = state.allProducts.find((product) => product._id === props._id);
  const checkBasket = state.basket.some((product) => product._id === props._id);
  const countItem = state.basket.find((product) => product._id === props._id);

  return (
    <div key={props._id} className="box">
      <Link to={`/${props._id}`}>
        <img className="product_img" src={props.image} alt="product" />
        <div className="content">
          <div className="title">
            <span>{props.title}</span>
          </div>
          <div className="price">
            <span>{props.price.toLocaleString()} USD</span>
          </div>
        </div>
      </Link>
      {checkBasket ? (
        <>
          <Buttons {...datas} />
          {datas.totalQty === countItem.count ? <p className="errFont fs-12px">Available stock: {datas.totalQty}</p> : null}
          {datas.totalQty === 0 ? <p className="errFont fs-12px">Sold out</p> : null}
        </>
      ) : (
        <button
          onClick={() => dispath({ type: "ADD_TO_BASKET", payload: props._id })}
          className="products_button buy_button"
        >
          Buy
          <FiShoppingCart className="buy_icon" />
        </button>
      )}
    </div>
  );
}
