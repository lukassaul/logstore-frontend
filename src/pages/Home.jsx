import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from "react-icons/ai";
import { FilterDispath } from '../components/Context/ContextFilter';

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
        <h1>woodcoin store</h1>
      </section>

      <div className="home-about">
        <h2>About us</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <div className="columns">
          <div className="col fade-in">
            <h3>Lorem, ipsum.</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              maiores fuga eos provident voluptas perferendis.
            </p>
          </div>
          <div className="col fade-in">
            <h3>A, illo!</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus minima quo beatae eius blanditiis officiis.
            </p>
          </div>
          <div className="col fade-in">
            <h3>Repudiandae, error?</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              quasi quis doloribus quia illum laudantium.
            </p>
          </div>
        </div>
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
    </main>
  );
};
