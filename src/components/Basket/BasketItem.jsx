import React, { useContext, useEffect } from "react";
import Buttons from "../Buttons/Buttons";
import { Link } from "react-router-dom";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { GetProductsAPI } from "../../api/getProducts";

export default function BasketItem(props) {
  const { state } = useContext(ProductContext);
  const { dispath } = useContext(ProductDispath) 

  const getProducts = async() => {
    if(state.filteredItems.length === 0) {
      let p = await GetProductsAPI()
      if (p.status === 200) dispath({ type: "SET_PRODUCTS", payload: p.data.message })
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const product = state.allProducts.find((product) => product._id === props._id);
  // console.log("basketItem props id: ", props)
  // console.log("basketItem prod: ", product)
  return (
    <>
      <div className="basket_item">
        <Link className="basket_link" to={`/${props._id}`}>
          <div className="basket_img">
            <img src={props.image} alt="basket_item" />
          </div>
          <div className="basket_content">
            <span className="basket_title">{props.title}</span>
            <span>{(props.price * props.count).toLocaleString()} LOG</span>
          </div>
        </Link>
        <div className="basket_counter">
          <Buttons {...props} />
          {product && product.totalQty === 0 ? <p className="errFont fs-12px">Sold out</p> : null}
          {product && props.count > product.totalQty && product.totalQty !== 0 ? <p className="errFont fs-12px">Available stock: {product && product.totalQty}. Please adjust your order</p> : null}
        </div>
      </div>
    </>
  );
}
