import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import Countdown from 'react-countdown';
import InputField from './InputField';
import { ProductContext, ProductDispath } from '../Context/ContextProvider';


export default function Form() {
  const navigate = useNavigate()
  const { dispath } = useContext(ProductDispath);
  const { state } = useContext(ProductContext);

  const [ step, setStep ] = useState(1)
  const [copied, setCopied] = useState(false)
  const [timerEnd, setTimerEnd] = useState(false);
  const [countdownDate, setCountdownDate] = useState(Date.now() + 1200000)

  const [ contactNumber, setContactNumber ] = useState()
  const [ contactNumberErrMsg, setContactNumberErrMsg ] = useState()
  const [ email, setEmail ] = useState()
  const [ emailErrMsg, setEmailErrMsg ] = useState()
  const [ firstName, setFirstName ] = useState()
  const [ firstNameErrMsg, setFirstNameErrMsg ] = useState()
  const [ lastName, setLastName ] = useState()
  const [ lastNameErrMsg, setLastNameErrMsg ] = useState()
  const [ country, setCountry ] = useState()
  const [ countryErrMsg, setCountryErrMsg ] = useState()
  const [ streetAddress, setStreetAddress ] = useState()
  const [ streetAddressErrMsg, setStreetAddressErrMsg ] = useState()
  const [ aptOther, setAptOther ] = useState()
  const [ aptOtherErrMsg, setAptOtherErrMsg ] = useState()
  const [ city, setCity ] = useState()
  const [ cityErrMsg, setCityErrMsg ] = useState()
  const [ stateUs, setStateUs ] = useState()
  const [ stateErrMsg, setStateErrMsg ] = useState()
  const [ postalCode, setPostalCode ] = useState()
  const [ postalCodeErrMsg, setPostalCodeErrMsg ] = useState()
  const [ province, setProvince ] = useState()
  const [ provinceErrMsg, setProvinceErrMsg ] = useState()

  const onSubmit = () => {
    console.log("contact number: ", contactNumber)
    console.log("email: ", email)
    console.log("firstName: ", firstName)
    console.log("lastName: ", lastName)
    console.log("country: ", country)
    console.log("streetAddress: ", streetAddress)
    console.log("aptOther: ", aptOther)
    console.log("city: ", city)
    console.log("stateUs: ", stateUs)
    console.log("postalCode: ", postalCode)
    console.log("province: ", province)
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
      "apt_other": aptOther,
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
    if (aptOther && aptOther.length > 100) {
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
        <span className="font-face-digital fs-25 yellowFont">
            {minutes}:{seconds}
        </span>
        );
    }
  };

  function generateAddress() {
    try {
        var hd = window.coinjs.hd(process.env.REACT_APP_XPUB)
        let x = Math.random() * 100;
        const INDEX = Math.floor(x)

        var address = hd.derive(INDEX)
        console.log("generated address: ", address)
        
    }catch(e) {
        console.log("ERROR")
    }
  }

  function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}'
  }

  useEffect(() => {
    //generateAddress()
  }, [])


  const ResetCountdown = () => {
      setCountdownDate(Date.now() + 1200000)
      setTimerEnd(false)
  }
  
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
                handleChange={handleChange}
                errMsg={contactNumberErrMsg}
              />
              <InputField
                type="email"
                label="Email"
                name="email"
                handleChange={handleChange}
                errMsg={emailErrMsg}
              />
              
            </div>
            
            <InputField
                type="text"
                label="First name*"
                name="firstName"
                handleChange={handleChange}
                errMsg={firstNameErrMsg}
              />
            
            <InputField
                type="text"
                label="Last name*"
                name="lastName"
                handleChange={handleChange}
                errMsg={lastNameErrMsg}
              />

            <InputField
                type="text"
                label="Country*"
                name="country"
                handleChange={handleChange}
                errMsg={countryErrMsg}
              />
            
            <InputField
                type="text"
                label="Street address*"
                name="streetAddress"
                handleChange={handleChange}
                errMsg={streetAddressErrMsg}
              />

            <InputField
                type="text"
                label="Apt/Suite/Other"
                name="aptOther"
                handleChange={handleChange}
                errMsg={aptOtherErrMsg}
              />

            <InputField
                type="text"
                label="City*"
                name="city"
                handleChange={handleChange}
                errMsg={cityErrMsg}
              />

            <InputField
                type="text"
                label="State (if US)"
                name="stateUs"
                handleChange={handleChange}
                errMsg={stateErrMsg}
              />

            


            <div className="frow">
              <InputField
                  type="text"
                  label="Postal code*"
                  name="postalCode"
                  handleChange={handleChange}
                  errMsg={postalCodeErrMsg}
                />

              <InputField
                  type="text"
                  label="Province*"
                  name="province"
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
            {!timerEnd ?
              <>
                <div className="fcentercol">
                    <Countdown date={countdownDate} renderer={renderer} />
                    <p className="text-center word-wrap mt1">Send woodcoin before timer ends</p>
                </div>
                <div className="fcentercol">
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value="Wbj4WLUhYpiRpr8HhRT9gdcdvHEW8dVnDx"
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <p className="font-bold mb0 tactr">Log Address</p>
                    <p 
                        className="fs12px pointer mb0 greenFont pointer tactr" 
                        style={{marginBottom: '0 !important'}} 
                        onClick={() => {showCopiedNotification(); navigator.clipboard.writeText("Wbj4WLUhYpiRpr8HhRT9gdcdvHEW8dVnDx")}}
                    >
                        Wbj4WLUhYpiRpr8HhRT9gdcdvHEW8dVnDx
                    </p>
                    <div style={{height: "24px"}}>
                        {copied ? <span className="font-success fs12px">LOG address copied</span> : null}
                    </div>
                </div>
              </>
              :
              null 
            }
            
          </>
          : 
          null
        }
      </form>
    </>
  );
}