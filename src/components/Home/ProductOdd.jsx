import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FilterDispath } from "components/Context/ContextFilter";

function ProductOdd(dispath, background, image, category, title, comp, description) {
    const navigate = useNavigate()

    const bg = `home-more-stuff ${background} bg-size40`
    const img = `/images/${image}`

    return (
      <div className={bg}>
        <div className='faacenterspca'>
          <img
            src={img}
            alt=""
            className="slide-in from-left"
          />
          <div className="slide-in from-right w50">
            <p 
              onClick={() => {
                dispath({ type: category })
                navigate("/products")
              }}
              className="product_title"
            > 
              <span className="bold">{title}</span><span className="text-muted fs-half"> {comp}</span>
            </p>
            <p className="text-muted w80">{description}</p>
          </div>
        </div>
      </div>
    )
}

export default ProductOdd;