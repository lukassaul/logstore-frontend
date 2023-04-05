import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import Countdown from 'react-countdown';
import InputField from './InputField';
import { ProductContext, ProductDispath } from '../Context/ContextProvider';
import { PostOrdersAPI } from '../../api/postOrders';


export default function Form(props) {
  const navigate = useNavigate()
  const { dispath } = useContext(ProductDispath);
  const { state } = useContext(ProductContext);

  const [ step, setStep ] = useState(1)
  const [copied, setCopied] = useState(false)
  const [timerEnd, setTimerEnd] = useState(false);
  //const [countdownDate, setCountdownDate] = useState(Date.now() + 1200000)
  const [k, setK] = useState(false);

  const [ logAddress, setLogAddress ] = useState()
  const [ contactNumber, setContactNumber ] = useState(state.shippingAddress.contact_number ? state.shippingAddress.contact_number : '')
  const [ contactNumberErrMsg, setContactNumberErrMsg ] = useState()
  const [ email, setEmail ] = useState(state.shippingAddress.email ? state.shippingAddress.email : '')
  const [ emailErrMsg, setEmailErrMsg ] = useState()
  const [ firstName, setFirstName ] = useState(state.shippingAddress.first_name ? state.shippingAddress.first_name : '')
  const [ firstNameErrMsg, setFirstNameErrMsg ] = useState()
  const [ lastName, setLastName ] = useState(state.shippingAddress.last_name ? state.shippingAddress.last_name : '')
  const [ lastNameErrMsg, setLastNameErrMsg ] = useState()
  const [ country, setCountry ] = useState(state.shippingAddress.country ? state.shippingAddress.country : '')
  const [ countryErrMsg, setCountryErrMsg ] = useState()
  const [ streetAddress, setStreetAddress ] = useState(state.shippingAddress.street_address ? state.shippingAddress.street_address : '')
  const [ streetAddressErrMsg, setStreetAddressErrMsg ] = useState()
  const [ aptOthers, setAptOther ] = useState(state.shippingAddress.apt_other ? state.shippingAddress.apt_other : '')
  const [ aptOtherErrMsg, setAptOtherErrMsg ] = useState()
  const [ city, setCity ] = useState(state.shippingAddress.city ? state.shippingAddress.city : '')
  const [ cityErrMsg, setCityErrMsg ] = useState()
  const [ stateUs, setStateUs ] = useState(state.shippingAddress.stateUs ? state.shippingAddress.stateUs : '')
  const [ stateErrMsg, setStateErrMsg ] = useState()
  const [ postalCode, setPostalCode ] = useState(state.shippingAddress.postal_code ? state.shippingAddress.postal_code : '')
  const [ postalCodeErrMsg, setPostalCodeErrMsg ] = useState()
  const [ province, setProvince ] = useState(state.shippingAddress.province ? state.shippingAddress.province : '')
  const [ provinceErrMsg, setProvinceErrMsg ] = useState()
  const [ txid, setTxid ] = useState()
  const [ paymentError, setPaymentError ] = useState()

  const onSubmit = () => {
    // console.log("contact number: ", contactNumber)
    // console.log("email: ", email)
    // console.log("firstName: ", firstName)
    // console.log("lastName: ", lastName)
    // console.log("country: ", country)
    // console.log("streetAddress: ", streetAddress)
    // console.log("aptOther: ", aptOthers)
    // console.log("city: ", city)
    // console.log("stateUs: ", stateUs)
    // console.log("postalCode: ", postalCode)
    // console.log("province: ", province)
    resetErrorMessages()

    const isDataValid = validate()

    if (!isDataValid) return

    console.log("data valid: ", isDataValid)
    let address = {
      "contact_number": contactNumber,
      "email": email,
      "first_name": firstName,
      "last_name": lastName,
      "country": country,
      "street_address": streetAddress,
      "apt_other": aptOthers,
      "city": city,
      "state": stateUs,
      "postal_code": postalCode,
      "province": province 
    }
    dispath({ type: "SHIPPING_ADDRESS", payload: address })
    setStep(2)
    
  };

  const resetErrorMessages = () => {
    setContactNumberErrMsg()
    setEmailErrMsg()
    setFirstName()
    setLastName()
    setCountry()
    setStreetAddress()
    setCity()
    setAptOtherErrMsg()
    setPostalCode()
    setStateErrMsg()
    setProvinceErrMsg()
  }

  const handleChange = (event, input) => {
    const value = event.target.value;
    switch(input) {
      case "contactNumber":
        setContactNumber(value)
        break;
      case "email":
        setEmail(value)
        break;
      case "firstName":
        setFirstName(value)
        break;
      case "lastName":
        setLastName(value)
        break;
      case "country":
        setCountry(value)
        break;
      case "streetAddress":
        setStreetAddress(value)
        break;
      case "aptOther":
        setAptOther(value)
        break;
      case "city":
        setCity(value)
        break;
      case "stateUs":
        setStateUs(value)
        break;
      case "postalCode":
        setPostalCode(value)
        break;
      case "province":
        setProvince(value)
        break;
      default:
        console.log("default switch block")
    }
    
  }

  const validate = () => {
    let isValid = true
    if (!contactNumber) {
      setContactNumberErrMsg("Contact number is required.")
      isValid = false
    }
    if (contactNumber && contactNumber.length > 20) {
      setContactNumberErrMsg("Contact number must not exceed 20 characters.")
      isValid = false
    }
    if (email && email.length > 50) {
      setEmailErrMsg("Email must not exceed 50 characters.")
      isValid = false
    }
    if (email) {
      var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(!email.match(mailformat)) {
        setEmailErrMsg("Invalid email address.")
        isValid = false
      }
    }
    if (!firstName) {
      setFirstNameErrMsg("First name is required.")
      isValid = false
    }
    if (firstName && firstName.length > 50) {
      setFirstNameErrMsg("First name must not exceed 50 characters.")
      isValid = false
    }
    if (!lastName) {
      setLastNameErrMsg("Last name is required.")
      isValid = false
    }
    if (lastName && lastName.length > 50) {
      setLastNameErrMsg("Last name must not exceed 50 characters.")
      isValid = false
    }
    if (!country) {
      setCountryErrMsg("Country is required.")
      isValid = false
    }
    if (country && country.length > 50) {
      setCountryErrMsg("Country must not exceed 50 characters.")
      isValid = false
    }
    if (!streetAddress) {
      setStreetAddressErrMsg("Street address is required.")
      isValid = false
    }
    if (streetAddress && streetAddress.length > 100) {
      setStreetAddressErrMsg("Street address must not exceed 100 characters.")
      isValid = false
    }
    if (aptOthers && aptOthers.length > 100) {
      setAptOtherErrMsg("Apt/Suite/Other must not exceed 100 characters.")
      isValid = false
    }
    if (!city) {
      setCityErrMsg("City is required.")
      isValid = false
    }
    if (city && city.length > 50) {
      setCityErrMsg("City must not exceed 50 characters.")
      isValid = false
    }
    
    if (stateUs && stateUs.length > 50) {
      setStateErrMsg("State must not exceed 50 characters.")
      isValid = false
    }
    if (!postalCode) {
      setPostalCodeErrMsg("Postal code is required.")
      isValid = false
    }
    if (postalCode && postalCode.length > 50) {
      setPostalCodeErrMsg("Postal code must not exceed 50 characters.")
      isValid = false
    }
    if (!province) {
      setProvinceErrMsg("Province is required.")
      isValid = false
    }
    if (province && province.length > 50) {
      setProvinceErrMsg("Province must not exceed 50 characters.")
      isValid = false
    }

    return isValid
  }

  function showCopiedNotification() {
    setCopied(true)
    setTimeout(function () {
        setCopied(false);
    }, 2000);
  }

  // Random component
  const Completionist = () => <span>Get new address!</span>;

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
        // Set timerEnd to true
        setTimerEnd(true)
        //setCountdownCompleted(true)
        // Close socket connection
        //closeSocket()

        // Render a complete state
        return <Completionist />;
    } else {
        // Render a countdown
        return (
        <span className="font-face-digital fs-25 yellowFont  mv2h1">
            {minutes}:{seconds}
        </span>
        );
    }
  };

  const restartTimer = () => {
    setK((i) => !i);
  }

  function generateAddress() {
    setLogAddress('WZa4qaL4AAJJVwqHW8AMNhRNLDAXfBHKtq')
    // try {
    //     var hd = window.coinjs.hd(process.env.REACT_APP_XPUB)
    //     let x = Math.random() * 100;
    //     const INDEX = Math.floor(x)

    //     var address = hd.derive(INDEX)
    //     console.log("generated address: ", address)
    //     setLogAddress(address)
        
    // }catch(e) {
    //     console.log("ERROR")
    // }
  }

  function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}'
  }

  useEffect(() => {
    if (step === 2) generateAddress()
  }, [step])

  var socket;
  // console.log("basket: ", state.basket.map(item => {
  //   return { productID: item._id, quantity: item.count}
  // }))
  function SocketController() {
      
      socket = new WebSocket(`wss://twigchain.com:4001?address=${logAddress}`)

      socket.addEventListener('open', function(event){
          console.log('connected to ws server')
      })

      socket.addEventListener('message', async function(event){
          console.log('message from server: ', event.data)
          if(event.data !== "something") {
              var response = JSON.parse(event.data)
              if(response.txid && response.amount >= state.totalPriceFinal ) {

                  var txid = response.txid
                  let orderData = {
                    address: {
                      contactNumber: state.shippingAddress.contact_number,
                      email: state.shippingAddress.email,
                      firstName: state.shippingAddress.first_name,
                      lastName: state.shippingAddress.last_name,
                      country: state.shippingAddress.country,
                      streetAddress: state.shippingAddress.street_address,
                      city: state.shippingAddress.city,
                      aptOthers: state.shippingAddress.apt_other,
                      state: state.shippingAddress.state,
                      postalCode: state.shippingAddress.postal_code,
                      province: state.shippingAddress.province
                    },
                    DEPOSITLOGADDRESS: logAddress,
                    logTXID: txid,
                    products: state.basket.map(item => {
                      return { item: item._id, quantity: item.count, size: item.size}
                    }),
                    totalPrice: state.totalPriceFinal
                  }

                  /*
                    Make a post request to the backend server
                  */
                  setTxid(txid)
                  setStep(2)
                  // Close socket connection
                  closeSocket()
                  let sendOrder = await PostOrdersAPI(orderData)
                  dispath({ type: "SENDING_ORDER", payload: true })
                  console.log("sendOrder: ", sendOrder)
                  if (sendOrder.status = 200 && !sendOrder.data.error) {

                    props.setOrderDetails(sendOrder.data.details)
                    dispath({ type: "PAYMENT_RECEIVED", payload: true})
                    dispath({ type: "SENDING_ORDER", payload: false })
                    dispath({ type: "EMPTY_BASKET" })
                  }
                  /**
                   * If there is an error, notify user that the payment was received
                   * and is being processed by the admin
                   * send an email for the order id 
                  */
                  if (sendOrder.data.message === "You have sent an amount less than to the total price. Sorry be we don't offer refund.") {
                    dispath({ type: "PAYMENT_RECEIVED", payload: true})
                    dispath({ type: "PAYMENT_ERROR", payload: true})
                  }
              } else {
                  console.log("LOG received is below order total price")
                  setPaymentError("The received payment (LOG) is below your order/'s total amount. Sorry, we don't do a refund.")
                  dispath({ type: "PAYMENT_RECEIVED", payload: true})
                  dispath({ type: "PAYMENT_ERROR", payload: true})
                  //setCountdownDate(Date.now())
                  setTimerEnd(true)
                  closeSocket()
              }
          }
      })

      socket.addEventListener('close', function(event){
          console.log('Closing websocket')
      })
      
  }

  function closeSocket() {
      console.log("close socket function: ", socket)
      if(socket && socket.readyState !== 0) {
          socket.close()
          console.log("socket state after close: ", socket.readyState)
      }
  }

  useEffect(() => {
    if(!socket && step === 2) {
        console.log("should call socketController")
        SocketController()
    }

    // return () => {
    //     console.log("leaving the page")
    //     closeSocket()
    // }
  }, [logAddress])
  
  return (
    <>
      <form className="form w100">
        {step===1 ?
          <>
            <div className="frow">
              <InputField
                type="text"
                label="Contact number*"
                name="contactNumber"
                value={contactNumber}
                handleChange={handleChange}
                errMsg={contactNumberErrMsg}
              />
              <InputField
                type="email"
                label="Email"
                name="email"
                value={email}
                handleChange={handleChange}
                errMsg={emailErrMsg}
              />
              
            </div>
            
            <InputField
                type="text"
                label="First name*"
                name="firstName"
                value={firstName}
                handleChange={handleChange}
                errMsg={firstNameErrMsg}
              />
            
            <InputField
                type="text"
                label="Last name*"
                name="lastName"
                value={lastName}
                handleChange={handleChange}
                errMsg={lastNameErrMsg}
              />

            <InputField
                type="text"
                label="Country*"
                name="country"
                value={country}
                handleChange={handleChange}
                errMsg={countryErrMsg}
              />
            
            <InputField
                type="text"
                label="Street address*"
                name="streetAddress"
                value={streetAddress}
                handleChange={handleChange}
                errMsg={streetAddressErrMsg}
              />

            <InputField
                type="text"
                label="Apt/Suite/Other"
                name="aptOther"
                value={aptOthers}
                handleChange={handleChange}
                errMsg={aptOtherErrMsg}
              />

            <InputField
                type="text"
                label="City*"
                name="city"
                value={city}
                handleChange={handleChange}
                errMsg={cityErrMsg}
              />

            <InputField
                type="text"
                label="State (if US)"
                name="stateUs"
                value={stateUs}
                handleChange={handleChange}
                errMsg={stateErrMsg}
              />

            


            <div className="frow">
              <InputField
                  type="text"
                  label="Postal code*"
                  name="postalCode"
                  value={postalCode}
                  handleChange={handleChange}
                  errMsg={postalCodeErrMsg}
                />

              <InputField
                  type="text"
                  label="Province*"
                  name="province"
                  value={province}
                  handleChange={handleChange}
                  errMsg={provinceErrMsg}
                />

            </div>

            <div className="frow">
              <button onClick={(e) => {e.preventDefault(); onSubmit()}} className="primary-button">Continue</button>
              <button onClick={(e) => {e.preventDefault(); navigate("/basket")}} className="cancel-button">Cancel</button>
            </div>
          </> 
          : 
          null 
        }
        {step===2 ?
          <>
            {!timerEnd && !state.paymentReceived ?
              <div className='fcentercolai' style={{opacity: timerEnd ? "0" : "1", transition: "all .2s"}}>
                
                <Countdown key={k} date={Date.now() + 1200000} renderer={renderer} />
                <p className="text-center word-wrap fs-2">Send woodcoin before timer ends</p>
                
                <div className="fcentercol mt2">
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                      {logAddress && <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={logAddress}
                        viewBox={`0 0 256 256`}
                      />}
                    </div>
                    <p className="font-bold mb0 tactr mt1">Log Address</p>
                    <p 
                        className="fs12px pointer mb0 greenFont pointer tactr" 
                        style={{marginBottom: '0 !important'}} 
                        onClick={() => {showCopiedNotification(); navigator.clipboard.writeText({logAddress})}}
                    >
                        {logAddress}
                    </p>
                    <div style={{height: "24px"}}>
                        {copied ? <span className="font-success fs12px">LOG address copied</span> : null}
                    </div>
                </div>
              </div>
              :
              <div className='fcentercolai animateSection'>
                <span className="font-face-digital fs-25 yellowFont mv2h1">0:00</span>

                <p className="text-center word-wrap fs-2">Still want to continue?</p>
                <img src="/images/timerEnd.gif" width='152px' height='auto'/>
                <p className="text-center word-wrap fs-1 mb1">Click reset timer if you want to repeat the payment time.</p>
                <div className="mv3h0">
                    <button onClick={() => restartTimer()} className="primary-button-nw">Reset timer</button>
                </div> 
              </div>
            }
          </>
          : 
          null
        }
      </form>
    </>
  );
}