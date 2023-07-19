import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AiOutlineArrowRight } from "react-icons/ai";
import { FilterDispath, FilterContext } from '../components/Context/ContextFilter';
// import allCategoriesLink from 'components/Home/AllCategoriesLink';
// import ProductOdd from 'components/Home/ProductOdd';
// import ProductEven from 'components/Home/ProductEven';
import Footer from 'components/Footer/Footer';
import Card from 'components/Products/Card/Card';

import { GetProductsAPI } from "api/getProducts";
import { BsJustifyLeft } from 'react-icons/bs';

export default function Home() {

  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  const navigate = useNavigate()

  const getProducts = async() => {
    if(state.filteredItems.length === 0) {
      let p = await GetProductsAPI()
      if (p.status === 200) dispath({ type: "SET_PRODUCTS", payload: p.data.message })
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  
  const productsList = state.filteredItems.filter((product) => {
    if(state.searchKey)
      return product.title.toLowerCase().includes(state.searchKey.toLowerCase()) || !state.searchKey;
    else return product.title.includes(state.searchKey) || !state.searchKey;
  });

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  useEffect(() => {
    const faders = document.querySelectorAll(".fade-in");
    const sliders = document.querySelectorAll(".slide-in");

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
      appearOnScroll.observe(slider);
    });
  }, [])



  return (
    <main>
      {/* <section className="home-intro">
        
      </section> */}

      <div className="home-about">
        <div className="home-banner-text mb2">
          <img 
            src="https://res.cloudinary.com/dba8ifej6/image/upload/v1689646403/mylogstore_text_zbqioj.png" 
            alt="MyLogstore"
            className='logo_text_img' 
          />
          <p className='txt-justify'>We are excited to offer a convenient and secure way to shop using Cryptocurrency payments. Our store features a wide variety of high-quality products, .........more. With our easy-to-use checkout process, you can quickly and securely complete your purchase using Woodcoin. Shop with confidence, knowing that your payment information is protected by the latest encryption technology. Start browsing our selection today and experience the future of online shopping with cryptocurrency!</p>
        </div>
        <div className="home-banner-text"> 
          {/* <p className='tactr bold fs-26px green-color'>No LOG's yet?</p> */}
          <p className='txt-justify'><span className='bold'>No LOG's yet?</span> You can buy them at the following exchanges: </p>
          <div className='fgap1'>
            <a href="https://hermesus.com" target='_blank'>Hermesus,</a>
            <a href="https://dex-trade.com" target='_blank'>Dex-trade,</a>
            <a href="https://finexbox.com" target='_blank'>Finexbox,</a>
            <a href="https://bitstorage.finance/" target='_blank'>Bitstorage</a>
          </div>
        </div>
      </div>

      
      {/*!-- Parallax banner -->*/}
        <div className='parallax-section'>
          <div>
            <div className="fend">
                <img src='images/landing_big_bg_shirt4.png' width={'80%'}/>
            </div>
          </div>
        </div>
      {/*!-- Parallax banner end -->*/}


      <div style={{textAlign: 'center', padding: '4em 0 2em'}}>
        <p className='home-title'>Our Collections</p>
      </div>
      <div className="product_container">
        {productsList.map((product) => <Card key={product._id} {...product} />)}
      </div>
      
      {/* {allCategoriesLink()}

      <div>
        {ProductOdd(dispath, "bg-olive", "landing_shirt.png", "TSHIRTS", "Tshirts", "Dailai", "Introducing our classic cotton t-shirt with a stylish logo. Made from 100% pure cotton, this t-shirt is soft and comfortable, perfect for everyday wear.")}

        {ProductEven(dispath, "bg-pink", "landing_tumbler.png", "TUMBLERS", "Tumbler", "Noomer", "Introducing our sleek and durable water bottle, designed to keep you hydrated on the go! Made from high-quality materials, this bottle is perfect for outdoor adventures, gym sessions, or simply for daily use.")}

        {ProductOdd(dispath, "bg-blue", "landing_cap.png", "CAPS", "Caps", "Vermont Secure", "Whether you're heading to the gym or running errands, this cap will keep you looking and feeling great. Introducing our versatile and stylish cap with a custom logo, perfect for any occasion!")}

        {ProductEven(dispath, "bg-green", "landing_usb.png", "USB", "USB Flashdrive", "Woodcoin", "Upgrade your digital storage game today with our USB drive. Aside from its sleek and unique look, it also comes with a pre-loaded applications to safely store your digital assets.")}

        {allCategoriesLink()}
      </div> */}

      <Footer />
    </main>
  );
};
