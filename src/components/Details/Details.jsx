import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import DOMPurify from 'dompurify';
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { HiArrowLeft } from "react-icons/hi";
import Buttons from "../Buttons/Buttons";
import { GetProductsAPI } from "../../api/getProducts";

export default function Details() {
  const navigate = useNavigate();
  const { state } = useContext(ProductContext);
  const { dispath } = useContext(ProductDispath);
  const params = useParams();

  const getProducts = async() => {
    console.log("state.allProducts.length: ", state.allProducts.length)
    if(state.allProducts.length === 0) {
      console.log("details getProducts")
      let p = await GetProductsAPI()
      if (p.status === 200) dispath({ type: "SET_PRODUCTS", payload: p.data.message })
    }
  }

  useEffect(() => {
    console.log("useEffect")
    getProducts()
  }, [])

  const datas = state.allProducts.find((product) => product._id == params.id);
  const checkBasket = state.basket.some((product) => product._id == params.id);

  console.log("details parameters: ", params)
  console.log("details allProducts: ", state.allProducts)
  console.log("details datas: ", datas)
  console.log("details checkbastket: ", checkBasket)


  return (
    <div className="details_container">
      <div className="details_linkBar">
        <span onClick={() => navigate(-1)} className="details_backLink">
          <HiArrowLeft />
            Back
        </span>
      </div>
      <div className="details_card">
        <div className="image_box">
          {datas && <ReactImageMagnify
              {...{
                smallImage: {
                  alt: datas.title,
                  isFluidWidth: true,
                  src: datas.image,
                },
                largeImage: {
                  src: datas.image,
                  width: 800,
                  height: 400,
                },
                enlargedImageContainerStyle: {
                  zIndex: "1500",
                  //borderRadius: "50%",
                },
                enlargedImageContainerDimensions: {
                  width: "200%",
                  height: "200%",
                },
                isHintEnabled: true,
                isFluidWidth: true,
              }}
            />
          }

        </div>
        <div className="main_content_box">
          <span className="card_category">{datas && datas.category}</span>
          <div className="card_content">
            <span className="card_title">{datas && datas.title}</span>
            <span style={{ color: "#8fc700" }}>|</span>
            <span className="card_price">
              {datas && datas.price.toLocaleString()} USD
            </span>
          </div>
          <div className="card_information">
            <ul>
              <li>Category: {datas && datas.category}</li>
              <li>Product: {datas && datas.title}</li>
            </ul>
          </div>
          {checkBasket && <Buttons {...datas} />}
          {!checkBasket &&
            <button
              onClick={() =>
                dispath({ type: "ADD_TO_BASKET", payload: datas._id })
              }
              className="card_buy"
            >
              Add to cart
            </button>
          }
        </div>
      </div>

      
      <div className="details_linkBar">
          <span className="bold">Product Description</span>
      </div>

      {datas && 
      <div className="description_card grayFont2" id="product_description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(datas.description)}}>
      </div>}
    </div>
  );
}
