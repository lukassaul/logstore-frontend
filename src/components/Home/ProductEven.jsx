import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function ProductEven(dispath, background, image, category, title, comp, description) {
    const navigate = useNavigate()

    const bg = `home-more-stuff ${background} bg-size40`
    const img = `/images/${image}`

    return (
        <div className={bg}>
          <div className='faacenterspca'>
            <div className="slide-in from-left w50">
              <p 
                onClick={() => {
                  dispath({ type: category })
                  navigate("/products")
                }}
                className="product_title"
              > 
                <span className="bold">{title}</span><span className="text-muted fs-half"> {comp}</span>
              </p>
              <p className="text-muted">{description}</p>
            </div>
            <img
              src={img}
              alt=""
              className="slide-in from-right"
            />
          </div>
        </div>
    )
}

export default ProductEven;