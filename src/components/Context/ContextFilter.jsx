import React, { createContext, useReducer, useEffect, useState } from "react";
import allProducts from "../../Data";
import { GetProductsAPI } from "../../api/getProducts"

export const FilterContext = createContext();
export const FilterDispath = createContext();

export default function ContextFilter({ children }) {
  
  const [prods, setProds] = useState([])

  const getProducts = async() => {
    let p = await GetProductsAPI()
    console.log("filter get products: ", p.data.message)
    if (p.status === 200) setProds(p.data.message)
  }
  
  useEffect(() => {
    console.log("context filter useEffect")
    getProducts()
  }, [])

  const initialFilterState = {
    filteredItems: [...prods],
    searchKey: ""
  };
  
  const filterItemsHandler = (key) => {
    const filteredItems = prods.filter((product) => {
      return product.category === key;
    });
  
    return { filteredItems };
  };
  
  const filterReduce = (state, action) => {
    switch (action.type) {
      case "SEARCH_KEYWORD":
        state.searchKey = action.payload;
        return {
          ...state
        };
      case "SET_PRODUCTS":
        state.filteredItems = action.payload;
        return {
          ...state
        };
      case "ALL":
        state.filteredItems = [...prods];
        return {
          ...state
        };
      case "PILLOWS":
        return {
          ...filterItemsHandler("Pillows")
        };
      case "BAGS":
        return {
          ...filterItemsHandler("Bags")
        };
      case "USB":
        return {
          ...filterItemsHandler("Usb")
        };
      case "TSHIRTS":
        return {
          ...filterItemsHandler("Tshirts")
        };
      case "CAPS":
        return {
          ...filterItemsHandler("Caps")
        };
      case "MUGS":
        return {
          ...filterItemsHandler("Mugs")
        };
      case "TUMBLERS":
        return {
          ...filterItemsHandler("Tumblers")
        };
      default:
        return state;
    }
  };

  const [state, dispath] = useReducer(filterReduce, initialFilterState);
  

  return (
    <FilterContext.Provider value={{ state }}>
      <FilterDispath.Provider value={{ dispath }}>
        {children}
      </FilterDispath.Provider>
    </FilterContext.Provider>
  );
}
