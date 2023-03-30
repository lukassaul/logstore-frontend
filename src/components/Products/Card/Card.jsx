import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Interest from "./Interest";
import { Link } from "react-router-dom";
import { ProductContext, ProductDispath } from "../../Context/ContextProvider";
import Buttons from "../../Buttons/Buttons";
import { PostLockProductAPI } from "../../../api/lockProduct";

export default function Card(props) {
  const { dispath } = useContext(ProductDispath);
  const { state } = useContext(ProductContext);
  const navigate = useNavigate()

  const datas = state.allProducts.find((product) => product._id === props._id);
  const checkBasket = state.basket.some((product) => product._id === props._id);
  const countItem = state.basket.find((product) => product._id === props._id);

  // console.log("state.allProducts: ", state.allProducts)
  // console.log("card datas: ", datas)

  return (
    <div key={props._id} className="box">
      <Link to={`/${props._id}`}>
        <img className="product_img" src={props.image} alt="product" />
        <div className="content">
          <div className="title">
            <span>{props.title}</span>
          </div>
          <div className="price">
            <span>{props.price.toLocaleString()} LOG</span>
          </div>
        </div>
      </Link>
      {/* {checkBasket ? (
        <>
          <Buttons {...datas} />
          {datas.totalQty === countItem.count ? <p className="errFont fs-12px">Available stock: {datas.totalQty}</p> : null}
          {datas.totalQty === 0 ? <p className="errFont fs-12px">Sold out</p> : null}
        </>
      ) : ( */}
        <>
        {datas.totalQty > 0 ?
          <button
            onClick={() => {
              navigate(`/${props._id}`)
              // if (props.category === "Tshirts") {
              //   navigate(`/${props._id}`)
              // } else {
              //   dispath({ type: "ADD_TO_BASKET", payload: {id: props._id, size: null} })
              //   let lockData = [{
              //     productId: props._id,
              //     size: null,
              //     quantity: 1
              //   }]
              //   try {
              //     PostLockProductAPI({product: lockData})
              //   }catch(e) {
              //     console.log("Error in locking item")
              //   }
              // }
            }}
            className="products_button buy_button"
          >
            Buy
            <FiShoppingCart className="buy_icon" />
          </button>
          :
          <button
            className="products_button soldout_button"
            disabled
          >
            Sold out
          </button>
        }
        </>
      {/* )} */}
    </div>
  );
}
