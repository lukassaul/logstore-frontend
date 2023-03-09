import React, { createContext, useReducer } from "react";
import allProducts from "../../Data";

const initialFilterState = {
  filteredItems: [...allProducts],
  searchKey: ""
};

const filterItemsHandler = (key) => {
  const filteredItems = allProducts.filter((product) => {
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
    case "ALL":
      state.filteredItems = [...allProducts];
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

export const FilterContext = createContext();
export const FilterDispath = createContext();

export default function ContextFilter({ children }) {
  const [state, dispath] = useReducer(filterReduce, initialFilterState);
  return (
    <FilterContext.Provider value={{ state }}>
      <FilterDispath.Provider value={{ dispath }}>
        {children}
      </FilterDispath.Provider>
    </FilterContext.Provider>
  );
}
