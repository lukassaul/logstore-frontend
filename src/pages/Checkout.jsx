import React, { useContext, useEffect, useState } from "react";
import SendProducts from "../components/Basket/SendProducts";
import { ProductContext, ProductDispath } from "../components/Context/ContextProvider";
import AddressForm from "../components/AddressForm/AddressForm";
import CheckoutItem from "../components/Basket/ CheckoutItem";
import { sendPrice } from "../Offer";

export default function Checkout() {
    const { state } = useContext(ProductContext);
    const { dispath } = useContext(ProductDispath)
    const [orderId, setOrderId ] = useState()

    const orderReceipt = () => {
        return (
            <div className="mt1">
                <p className="tactr fs-36px grayFont2 bold">THANK YOU</p>
                <p className="tactr mb2">Thank you for shopping. We have received your payment.</p>

                <p className="bold">Order number:</p>
                <p className="fs-26px grayFont2 bold mb2">{orderId}</p>

                <p className="mb2">Estimated deliver time frame by region (in working days) - Metro Manila: 1 - 3 days, Luzon: 5 - 8 days, Visayas: 8 - 10 days, Mindanao: 10 - 12 days. Government mandated Community Quarantine may impact delivery time.Package includes official receipt (BIR Registered), packing list, return form, and the items you ordered.</p>

                <div className="formBack br25 w100 pv3h4">
                    <p className="fs-26px grayFont bold">Order summary</p>
                    <div className="bbgreen mb2 pv1h1 fcentercol">
                        <table style={{width:"80%"}}>
                            <tr>
                                <td>Item(s) subtotals</td>
                                <td style={{textAlign: 'end'}}>{state.totalPrice} LOG</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td style={{textAlign: 'end'}}>{sendPrice} LOG</td>
                            </tr>
                            <tr className="bold">
                                <td>subtotals</td>
                                <td style={{textAlign: 'end'}}>{state.totalPriceFinal} LOG</td>
                            </tr>
                            <tr className="bold fs-15">
                                <td>Order total</td>
                                <td style={{textAlign: 'end'}}>{state.totalPriceFinal} LOG</td>
                            </tr>
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
                        <span>Shipping</span>
                        <span>{sendPrice} LOG</span>

                        <p className="bold m1">Estimated deliver time: 02/28/2023 - 023/03/2023</p>
                        <p>Estimated deliver time frame by region (in working days) - Metro Manila: 1 - 3 days, Luzon: 5 - 8 days, Visayas: 8 - 10 days, Mindanao: 10 - 12 days. Government mandated Community Quarantine may impact delivery time.Package includes official receipt (BIR Registered), packing list, return form, and the items you ordered.</p>
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
                            <AddressForm setOrderId={setOrderId} />
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

            {state.paymentReceived && !state.paymentError ? orderReceipt() : null}

            {state.paymentReceived && state.paymentError ? insufficientPayment() : null}
        </div>
    )
}