import React, { useContext } from "react";
import Filter from "./Filter/Filter";
import { FilterContext } from "../Context/ContextFilter";
import Card from "./Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";

export default function Products() {
  const { state } = useContext(FilterContext);

  const productsList = state.filteredItems.filter((product) => {
    if(state.searchKey)
      return product.title.toLowerCase().includes(state.searchKey.toLowerCase()) || !state.searchKey;
    else return product.title.includes(state.searchKey) || !state.searchKey;
  });

  return (
    <>
      <Filter />
      <div className="search_Container">
        <div className="search_box">
          <SearchBar />
        </div>
      </div>
      
        {productsList.length > 0 ? (
          <div className="product_container">
            {productsList.map((product) => <Card key={product.id} {...product} />)}
          </div>
        ) : (
          <div className="fcentercol mh60">
            <img
              className="products_empty_img"
              src="images/bare-tree.png"
              alt=""
            />
            <span className="products_empty_title">
              Sorry, no products matched your search!
            </span>
            <span className="products_empty_guide">
              Enter another keyword and try
            </span>
          </div>
        )}
        
      <Footer />
    </>
  );
}
