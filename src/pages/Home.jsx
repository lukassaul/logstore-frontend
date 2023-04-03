import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from "react-icons/ai";
import { FilterDispath } from '../components/Context/ContextFilter';
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
        <h1>myLogStore</h1>
      </section>

      <div className="home-about">
        {/* <h2>About us</h2>
        <p>Welcome to mylog store! We are excited to offer a convenient and secure way to shop using cryptocurrency payments. Our store features a wide variety of high-quality products,.........more.</p>
        <div className="columns mt2">
          <div className="col fade-in">
            <h3>Easy-to-use checkout</h3>
            <p>
            With our easy-to-use checkout process, you can quickly and securely complete your purchase using Bitcoin, Ethereum, or other popular.cryptocurrencies
            </p>
          </div>
          <div className="col fade-in">
            <h3>Shop with confidence</h3>
            <p>
            Shop with confidence knowing that your payment information is protected by the latest encryption technology.
            </p>
          </div>
          <div className="col fade-in">
            <h3>Start browing</h3>
            <p>
            Start browsing our selection today and experience the future of online shopping with cryptocurrency!
            </p>
          </div>
        </div> */}
        <p className='mb1 bold fs-26px tactr'>Welcome to mylog store!</p>
        <p>We are excited to offer a convenient and secure way to shop using Cryptocurrency payments. Our store features a wide variety of high-quality products, .........more. With our easy-to-use checkout process, you can quickly and securely complete your purchase using Woodcoin. Shop with confidence, knowing that your payment information is protected by the latest encryption technology. Start browsing our selection today and experience the future of online shopping with cryptocurrency!</p>
      </div>

      <div className='fcenter'>
        <p
          onClick={() => {
            dispath({ type: "ALL" })
            navigate("/products")
          }}
          className="pbtnGreen"
        >
            All Categories <AiOutlineArrowRight />
        </p>
      </div>

      <div className="home-more-stuff">
        <div className="more-stuff-grid bg-green">
          <img
            src="/images/blacktshirt.png"
            alt=""
            className="slide-in from-left"
          />
          <div className="slide-in from-right">
            <p 
              onClick={() => {
                dispath({ type: "TSHIRTS" })
                navigate("/products")
              }}
              className="product_title"
            > 
              <span className="bold">Tshirts</span><span className="text-muted fs-half"> Dailai</span>
            </p>
            <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae maiores fuga eos provident voluptas perferendis.</p>
          </div>
        </div>
        <div className="more-stuff-grid bg-pink">
          <div className="slide-in from-left">
            <p 
              onClick={() => {
                dispath({ type: "TUMBLERS" })
                navigate("/products")
              }}
              className="product_title"
            >  
              <span className="bold">Tumbler</span><span className="text-muted fs-half"> Noomer</span>
            </p>
            <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae maiores fuga eos provident voluptas perferendis.</p>
          </div>
          <img
            src="/images/landing-tumbler.png"
            alt=""
            className="slide-in from-right"
          />
        </div>
        <div className="more-stuff-grid bg-blue">
          <img
            src="/images/landing-cap.png"
            alt=""
            className="slide-in from-left"
          />
          <div className="slide-in from-right">
            <p 
              onClick={() => {
                dispath({ type: "CAPS" })
                navigate("/products")
              }}
              className="product_title"
            >  
              <span className="bold">Caps</span><span className="text-muted fs-half"> Vermont Secure</span>
            </p>
            <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae maiores fuga eos provident voluptas perferendis.</p>
          </div>
        </div>
        <div className="more-stuff-grid bg-olive">
          <div className="slide-in from-left">
            <p 
              onClick={() => {
                dispath({ type: "USB" })
                navigate("/products")
              }}
              className="product_title"
            >  
              <span className="bold">USB Flashdrive</span><span className="text-muted fs-half"> Woodcoin</span>
            </p>
            <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae maiores fuga eos provident voluptas perferendis.</p>
          </div>
          <img
            src="/images/landing-usb.png"
            alt=""
            className="slide-in from-right"
          />
        </div>

        <div className='fcenter'>
          <p
            onClick={() => {
              dispath({ type: "ALL" })
              navigate("/products")
            }}
            className="pbtnGreen"
          >
              All Categories <AiOutlineArrowRight />
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};
