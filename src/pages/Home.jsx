import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from "react-icons/ai";
import { FilterDispath } from '../components/Context/ContextFilter';
import allCategoriesLink from 'components/Home/AllCategoriesLink';
import ProductOdd from 'components/Home/ProductOdd';
import ProductEven from 'components/Home/ProductEven';
import Footer from 'components/Footer/Footer';

export default function Home() {

  const { dispath } = useContext(FilterDispath);
  const navigate = useNavigate()

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
      <section className="home-intro">
        
      </section>

      <div className="home-about">
        <p className='mb1 bold fs-26px tactr'>Welcome to mylog store!</p>
        <p>We are excited to offer a convenient and secure way to shop using Cryptocurrency payments. Our store features a wide variety of high-quality products, .........more. With our easy-to-use checkout process, you can quickly and securely complete your purchase using Woodcoin. Shop with confidence, knowing that your payment information is protected by the latest encryption technology. Start browsing our selection today and experience the future of online shopping with cryptocurrency!</p>
      </div>

      {allCategoriesLink()}

      <div>
        {ProductOdd(dispath, "bg-olive", "landing_shirt.png", "TSHIRTS", "Tshirts", "Dailai", "Introducing our classic cotton t-shirt with a stylish logo. Made from 100% pure cotton, this t-shirt is soft and comfortable, perfect for everyday wear.")}

        {ProductEven(dispath, "bg-pink", "landing_tumbler.png", "TUMBLERS", "Tumbler", "Noomer", "Introducing our sleek and durable water bottle, designed to keep you hydrated on the go! Made from high-quality materials, this bottle is perfect for outdoor adventures, gym sessions, or simply for daily use.")}

        {ProductOdd(dispath, "bg-blue", "landing_cap.png", "CAPS", "Caps", "Vermont Secure", "Whether you're heading to the gym or running errands, this cap will keep you looking and feeling great. Introducing our versatile and stylish cap with a custom logo, perfect for any occasion!")}

        {ProductEven(dispath, "bg-green", "landing_usb.png", "USB", "USB Flashdrive", "Woodcoin", "Upgrade your digital storage game today with our USB drive. Aside from its sleek and unique look, it also comes with a pre-loaded applications to safely store your digital assets.")}

        {allCategoriesLink()}
      </div>

      <Footer />
    </main>
  );
};
