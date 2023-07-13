import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const handelToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer">
      <span onClick={handelToTop} className="go_top">
        <FaArrowUp />
      </span>
      <div className="footer_first">

        <div className="footer_btn_title_box">
          <p>
            MyLogStore
          </p>
        </div>
      </div>
      <div className="footer_last">
        <span>Quick access</span>
        <div className="footer_link_box">
          <Link to={"/basket"}>Shopping cart</Link>
          {/* <Link to={"/products"}>Products</Link> */}
        </div>
      </div>
    </footer>
  );
}
