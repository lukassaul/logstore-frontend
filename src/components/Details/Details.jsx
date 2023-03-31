import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import DOMPurify from 'dompurify';
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { HiArrowLeft } from "react-icons/hi";
import Buttons from "../Buttons/Buttons";
import { GetProductsAPI } from "../../api/getProducts";
import { PostLockProductAPI } from "../../api/lockProduct";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

export default function Details() {
  const navigate = useNavigate();
  const { state } = useContext(ProductContext);
  const { dispath } = useContext(ProductDispath);
  const params = useParams();

  const [ orderedSize, setOrderedSize ] = useState()
  const [ selectSizeError, setSelectSizeError ] = useState('')
  const [ itemCount, setItemCount ] = useState(0)
  const [ itemCountError, setItemCountError ] = useState('')
  const [ availableStock, setAvailableStock ] = useState(0)

  const getProducts = async() => {
    //console.log("state.allProducts.length: ", state.allProducts.length)
    //if(state.allProducts.length === 0) {
      //console.log("details getProducts")
      let p = await GetProductsAPI()
      if (p.status === 200) dispath({ type: "SET_PRODUCTS", payload: p.data.message })
    //}
  }

  const datas = state.allProducts.find((product) => product._id == params.id);
  const checkBasket = state.basket.some((product) => product._id == params.id);
  const basketItem = state.basket.find((product) => product._id == params.id)

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (datas) setAvailableStock(datas.totalQty)
  }, [datas])

  /**
   * Checking the size of the items present on the cart
   * 
   */
  // useEffect(() => {
  //   if(basketItem && basketItem.category === "Tshirts") setOrderedSize(basketItem.size) 
  // }, [basketItem])

  // console.log("details parameters: ", params)
  // console.log("details allProducts: ", state.allProducts)
  // console.log("details datas: ", datas)
  // console.log("details checkbastket: ", checkBasket)


  function setSizeQuantity(size) {
    switch (size) {
      case "Small":
        setAvailableStock(datas.smallQty)
        break
      case "Medium":
        setAvailableStock(datas.mediumQty)
        break
      case "Large":
        setAvailableStock(datas.largeQty)
        break
      case "XL":
        setAvailableStock(datas.xlQty)
        break
      case "XXL":
        setAvailableStock(datas.xxlQty)
        break
      case "XXXL":
        setAvailableStock(datas.xxxlQty)
        break
      default:
        setAvailableStock(datas.totalQty)
        break
    }
  }

  const showSizes = (size) => {
    let soldout = false 
    switch (size) {
      case "Small":
        if (datas.smallQty < 1) soldout = true
        break
      case "Medium":
        if (datas.mediumQty < 1) soldout = true
        break
      case "Large":
        if (datas.largeQty < 1) soldout = true
        break
      case "XL":
        if (datas.xlQty < 1) soldout = true
        break
      case "XXL":
        if (datas.xxlQty < 1) soldout = true
        break
      case "XXXL":
        if (datas.xxxlQty < 1) soldout = true
        break
      default:
        console.log("default")
        break
    }
    
    if (soldout) return (
      <span 
        className={orderedSize === size ? "sizes-select-soldout selected" : "sizes-select-soldout"} 
      >
        {size}
      </span>
    )
    else return (
      <span 
        className={orderedSize === size ? "sizes-select pointer selected" : "sizes-select pointer"} 
        onClick={ () => {
          setOrderedSize(size)
          setSelectSizeError('')
          setSizeQuantity(size)
        }}
      >
        {size}
      </span>
    )
  }

  const showAvailableQuantity = () => {
    switch (orderedSize) {
      case "Small":
        return (<p className="available-pcs mt1">Available stocks: {datas.smallQty}</p>)
      case "Medium":
        return (<p className="available-pcs mt1">Available stocks: {datas.mediumQty}</p>)
      case "Large":
        return (<p className="available-pcs mt1">Available stocks: {datas.largeQty}</p>)
      case "XL":
        return (<p className="available-pcs mt1">Available stocks: {datas.xlQty}</p>)
      case "XXL":
        return (<p className="available-pcs mt1">Available stocks: {datas.xxlQty}</p>)
      case "XXXL":
        return (<p className="available-pcs mt1">Available stocks: {datas.xxxlQty}</p>)
      default:
          return null
    }
  }

  function itemQuantityController(operation) {
    console.log("available stock: ", availableStock)
    if (datas.category === "Tshirts" && !orderedSize) {
      setSelectSizeError("Please select size.")
      return
    }
    if (operation==="ADD" && itemCount < availableStock) {
      setItemCount(itemCount + 1)
      setItemCountError('')
      return
    }
    if (operation==="MINUS" && itemCount >= 1) {
      setItemCount(itemCount - 1)
      setItemCountError('')
      return
    }
  }

  function clearStates() {
    setItemCount(0)
    if (orderedSize) setOrderedSize(null)
  }

  const quantityControl = () => {
    return (
      <div className="card_information">
        <div className="faacenter">
          <span className="mr1">Quantity: </span>
          <div className="basket_buttons">
            <span className="basket_plus" onClick={() => itemQuantityController("ADD")}>
              <AiOutlinePlus />
            </span>
            <span className="counter_number">{itemCount && itemCount}</span>
            <span className="basket_minus" onClick={() => itemQuantityController("MINUS")}>
              <AiOutlineMinus />
            </span>
          </div>
        </div>
        {itemCountError ? <p className="errFont fs-12px">{itemCountError}</p> : null}
      </div>
    );
  }



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
                  width: 1000,
                  height: 480,
                },
                enlargedImageContainerStyle: {
                  zIndex: "1500",
                  //borderRadius: "50%",
                },
                enlargedImageContainerDimensions: {
                  width: "100%",
                  height: "100%",
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
              {datas && datas.price.toLocaleString()} LOG
            </span>
          </div>
          <div className="card_information">
            <ul>
              <li>Category: {datas && datas.category}</li>
              <li>Product: {datas && datas.title}</li>
            </ul>
          </div>

          {datas.category === "Tshirts" ? 
            <div style={{display: "flex", gap: "8px"}}>
              {showSizes("Small")}
              {showSizes("Medium")}
              {showSizes("Large")}
              {showSizes("XL")}
              {showSizes("XXL")}
              {showSizes("XXXL")}
            </div> 
            : 
            null
          }

          {datas.category === "Tshirts" && orderedSize ? showAvailableQuantity() : null}

          {selectSizeError ? <p className="errFont fs-12px">{selectSizeError}</p> : null}

          {quantityControl()}

          {/* {checkBasket && <Buttons {...datas} />}
          {!checkBasket && */}
            <button
              onClick={async() => {
                if (itemCount === 0) {
                  setItemCountError('Add item quantity') 
                  return
                }
                if (datas.category === "Tshirts") {
                  if (orderedSize) {
                    dispath({ type: "ADD_TO_BASKET", payload: {id: datas._id, size: orderedSize, count: itemCount} })
                    let lockData = [{
                      productId: datas._id,
                      size: orderedSize,
                      quantity: itemCount
                    }]
                    try {
                      await PostLockProductAPI({product: lockData})
                      clearStates()
                      getProducts()
                    }catch(e) {
                      console.log("Error in locking item")
                    }
                  } else 
                    setSelectSizeError("Please select size.")
                } else {
                  dispath({ type: "ADD_TO_BASKET", payload: {id: datas._id, size: null, count: itemCount} })
                  let lockData = [{
                    productId: datas._id,
                    size: orderedSize,
                    quantity: itemCount
                  }]
                  try {
                    await PostLockProductAPI({product: lockData})
                    clearStates()
                    getProducts()
                  }catch(e) {
                    console.log("Error in locking item")
                  }
                }
              }}
              className="card_buy"
            >
              Add to cart
            </button>
          {/* } */}
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
