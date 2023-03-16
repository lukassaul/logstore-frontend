import React, { createContext, useReducer, useEffect, useState } from "react";
import allProducts from "../../Data";
import offerCode from "../../Offer";
import { sendPrice } from "../../Offer";
import { GetProductsAPI } from "../../api/getProducts";

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
const priceTotal = localStorage.getItem('priceTotal') !== null ? JSON.parse(localStorage.getItem('priceTotal')) : 0

const setItemFunc = (basket) => {
  localStorage.setItem('cartItems', JSON.stringify(basket.map(item=>item)))
}

const initialState = {
  allProducts: [],
  basket: items,
  totalPrice: 0,
  totalPriceAfterOffer: 0,
  offerPrice: 0,
  totalPriceFinal: priceTotal,
  isEnterOfferCode: false,
  offerMessage: "",
  shippingAddress: {},
  paymentReceived: false
};

const sumPrice = (items, isOffer) => {
  const totalPrice = items.reduce((totalPrice, product) => {
    return totalPrice + product.price * product.count;
  }, 0);

  if (isOffer) {
    const offerPrice = (totalPrice * offerCode.disCount) / 100;
    const totalPriceAfterOffer = totalPrice - offerPrice;

    return {
      totalPrice,
      offerPrice,
      totalPriceAfterOffer,
      ...sumPriceWithSend(totalPrice, offerPrice)
    };
  } else {
    return { totalPrice, ...sumPriceWithSend(totalPrice) };
  }
};

// calc Price With shopping cost
const sumPriceWithSend = (totalPrice, offerPrice = 0) => {
  let totalPriceFinal = null;

  if (totalPrice - offerPrice <= 100_000) {
    totalPriceFinal = totalPrice + sendPrice - offerPrice;
  } else {
    totalPriceFinal = totalPrice - offerPrice;
  }

  localStorage.setItem('priceTotal', JSON.stringify(totalPriceFinal))

  return { totalPriceFinal };
};

const reduce = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      state.allProducts = action.payload;
      return {
        ...state
      };
    case "ADD_TO_BASKET": {
      const hasProduct = state.basket.some(
        (product) => product._id === action.payload
      );
      if (!hasProduct) {
        const mainItem = state.allProducts.find(
          (product) => product._id === action.payload
        );
        mainItem.count = 1
        state.basket.push(mainItem);
        setItemFunc(state.basket)
      }

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "REMOVE_FROM_BASKET": {
      const indexDelete = state.basket.findIndex(
        (product) => product._id === action.payload
      );
      state.basket[indexDelete].count = 1;
      state.basket = state.basket.filter(
        (product) => product._id !== action.payload
      );

      setItemFunc(state.basket)

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "INCREASE": {
      const indexPlus = state.basket.findIndex(
        (product) => product._id === action.payload
      );
      state.basket[indexPlus].count++;
      
      setItemFunc(state.basket)

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "DECREASE": {
      const indexMinus = state.basket.findIndex(
        (product) => product._id === action.payload
      );
      if (state.basket[indexMinus].count > 1) {
        state.basket[indexMinus].count--;
      }

      setItemFunc(state.basket)

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "EMPTY_BASKET": {
      state.basket = state.basket.forEach((product) => (product.count = 1));
      state.basket = [];

      setItemFunc(state.basket)
      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "REMOVE_CLASS": {
      state.isFavorite = false;
      return {
        ...state
      };
    }
    case "OFFER_CODE": {
      if (offerCode.code === action.payload) {
        state.isEnterOfferCode = true;
        state.offerMessage = "Discount applied";
      } else {
        state.offerMessage = "The code entered is not valid";
      }
      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "SHIPPING_ADDRESS": {
      state.shippingAddress = action.payload
      return {
        ...state,
      };
    }
    case "PAYMENT_RECEIVED": {
      state.paymentReceived = action.payload
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export const ProductContext = createContext();
export const ProductDispath = createContext();

export default function ContextProvider({ children }) {
  const [state, dispath] = useReducer(reduce, initialState);

  const getProducts = async() => {
    let p = await GetProductsAPI()
    console.log("get products: ", p.status)
    if (p.data.message) dispath({ type: "SET_PRODUCTS", payload: p.data.message })
  }
  
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductContext.Provider value={{ state }}>
      <ProductDispath.Provider value={{ dispath }}>
        {children}
      </ProductDispath.Provider>
    </ProductContext.Provider>
  );
}