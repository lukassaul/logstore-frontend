import Footer from "components/Footer/Footer";
import React from "react";

export default function ContactUs() {

    return (
        <main className="fill-height">
        <div className="checkout_container grayFont2 area_fill">
            <div className="faacenterspca mt2">
                <div>
                    <p className="bold fs-26px mb1">Contact Us</p>

                    <p className="mb1">
                        You can contact us by emailing us directly at <span className="bold">support@mylogstore.com</span>. We strive to respond to all inquiries within 24 hours. 
                    </p>

                    <div className="green_bg pv2hhalf mb1">
                        <p>
                            If you have concerns about your order, please include the Order ID so we can easily address the issue.
                        </p>
                    </div>

                    <p>
                        Thank you for choosing <span className="bold">Mylogstore</span>, We hope you have a wonderful experience!
                    </p>
                </div>
                <div>
                    <img src="images/contact_bg.png" width="100%" height="auto" />
                </div>
            </div>
            
        </div>

        <Footer />
    </main>
        
    )

};