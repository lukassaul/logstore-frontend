import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  const { state } = useContext(ProductContext);
  const { dispath } = useContext(ProductDispath);
  // Get location for hide & show SearchBar Component
  const location = useLocation();
  const { pathname } = location;

  const [ addToBasket, setAddToBasket ] = useState(true)

  // run only if state changes and Not Mount
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      setTimeout(() => {
        dispath({ type: "REMOVE_CLASS" });
      }, 1000);
    } else {
      didMount.current = true;
    }
  }, [dispath, state.favorites]);


  // run only if basket state changes and Not Mount
  useEffect(() => {
    setAddToBasket(true)
    setTimeout(() => {
      setAddToBasket(false)
    }, 3000);
    
  }, [state.basket]);



  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"} className="logo">
          Online store
        </Link>
        {/* <div className="search_header">{pathname === "/products" && <SearchBar />}</div> */}
        <div className="icon_Sopping_box">
          <Link to={"/basket"} className="shoppe_icon_box">
            <AiOutlineShopping className="shop_icon" />
            {state.basket.length > 0 && (
              <span className="badge_shope">{state.basket.length}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
