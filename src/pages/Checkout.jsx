import React, { useContext, useEffect, useState } from "react";
import SendProducts from "../components/Basket/SendProducts";
import { ProductContext, ProductDispath } from "../components/Context/ContextProvider";
import AddressForm from "../components/AddressForm/AddressForm";
import CheckoutItem from "../components/Basket/ CheckoutItem";
import { sendPrice } from "../Offer";

export default function Checkout() {
    const { state } = useContext(ProductContext);
    const { dispath } = useContext(ProductDispath)
    const [orderDetails, setOrderDetails ] = useState()

    /**
     * To be used for displaying the receipt when the user 
     * successfully perform checkout process
     * deliveryDateOne and deliveryDateTwo is the estimated
     * delivery time
     */
    var today = new Date();
    var deliveryDateOne = new Date();
    deliveryDateOne.setDate(today.getDate()+3);
    var deliveryDateTwo = new Date();
    deliveryDateTwo.setDate(today.getDate()+5);

    const orderReceipt = () => {
        return (
            <div className="mt1">
                <p className="tactr fs-36px grayFont2 bold">THANK YOU</p>
                <p className="tactr mb2">Thank you for shopping. We have received your payment.</p>

                <p className="bold">Order number:</p>
                <p className="fs-26px grayFont2 bold mb2">{orderDetails && orderDetails._id}</p>

                <p className="mb2">Estimated delivery time: Three (3) to five (5) days after receiving the payment.</p>
                <div className="formBack br25 w100 pv3h4">
                    <p className="fs-26px grayFont bold">Order summary</p>
                    <div className="bbgreen mb2 pv1h1 fcentercol">
                        <table style={{width:"80%"}}>
                            <tbody>
                                <tr>
                                    <td>Item(s)</td>
                                    <td style={{textAlign: 'end'}}>{orderDetails && orderDetails.products.length} item(s)</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td style={{textAlign: 'end'}}>Included in the total price</td>
                                </tr>
                                <tr className="bold">
                                    <td>subtotals</td>
                                    <td style={{textAlign: 'end'}}>{orderDetails && orderDetails.price} LOG</td>
                                </tr>
                                <tr className="bold fs-15">
                                    <td>Order total</td>
                                    <td style={{textAlign: 'end'}}>{orderDetails && orderDetails.price} LOG</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="fs-26px grayFont bold">Shipping address</p>
                    <div className="bbgreen mb2 pv1h1">
                        <p>{state.shippingAddress.first_name} {state.shippingAddress.last_name}</p>
                        <p>{state.shippingAddress.street_address}</p>
                        {state.shippingAddress.apt_other ? <p>| {state.shippingAddress.apt_other}</p> : null}
                        <p>{state.shippingAddress.city}, {state.shippingAddress.province} {state.shippingAddress.postal_code}</p>
                        <p>{state.shippingAddress.country}</p>
                        <p>{state.shippingAddress.contact_number} {state.shippingAddress.email ? <span>| {state.shippingAddress.email}</span> : null} </p>
                    </div>

                    <p className="fs-26px grayFont bold">Delivery date</p>
                    <div className="pv1h1">
                        <span>Shipping included in the total price</span>
                        <p className="bold m1">Estimated deliver time: {deliveryDateOne.toLocaleDateString()} - {deliveryDateTwo.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        )
    }

    const insufficientPayment = () => {
        return(
            <div className='fcentercolai mt2 animateSection'>
                <p className="text-center word-wrap fs-2">Woodcoin (LOG) already received</p>
                <p className="text-center word-wrap fs-12px mb1">The received LOG payment is below your cart's total amount. Sorry, we don't do a refund.</p>

                <img src="/images/no-refund.gif" width='720px' height='auto'/>
            </div>
        )
    }

    const invalidTransaction = () => {
        return(
            <div className='fcentercolai mt2 animateSection'>
                <p className="text-center word-wrap fs-2">Invalid transaction.</p>
                <p className="text-center word-wrap fs-12px mb3">An error occurred while processing your order.</p>

                <img src="/images/invalid_transaction.png"/>
            </div>
        )
    }

    useEffect(() => {
        return () => {
            dispath({ type: "PAYMENT_RECEIVED", payload: false})
            dispath({ type: "PAYMENT_ERROR", payload: false})
        }
    }, [])

    return (
        <div className="checkout_container grayFont">
            {!state.paymentReceived ? 
                <>
                    <div className="favorite_linkBar">
                        <span className="bold">Checkout</span>
                    </div>

                
                    <div className="basket_container">
                        <div className="fcentercolai br25 w60">
                            <AddressForm setOrderDetails={setOrderDetails} />
                        </div>
                        <div className="w40">
                            <div className="basket_priceBox mb1">
                                <div className="basket_price">
                                    <span>Order Summary</span>
                                    <span>|</span>
                                    <span>{state.basket.length} items</span>
                                    </div>
                                    {state.totalPriceAfterOffer > 0 && (
                                    <div className="basket_offer">
                                        <span>Discounted Price</span>
                                        <span>{state.totalPriceAfterOffer.toLocaleString()} LOG</span>
                                    </div>
                                    )}
                                    <SendProducts />
                                    <div className="basket_send">
                                    <span>Total amount payable</span>
                                    <span>{state.totalPriceFinal.toLocaleString()} LOG</span>
                                </div>
                            </div>
                            <div className="basket_itemBox item_box_scroll">
                                {state.basket.map((product) => (
                                    <CheckoutItem key={product.cartId} {...product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
                :
                null
            }

            {state.paymentReceived && !state.paymentError && !state.transactionError ? orderReceipt() : null}

            {state.paymentReceived && state.paymentError ? insufficientPayment() : null}

            {state.paymentReceived && state.transactionError ? invalidTransaction() : null}
        </div>
    )
}