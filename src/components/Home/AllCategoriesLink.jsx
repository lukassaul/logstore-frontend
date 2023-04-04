
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FilterDispath } from "components/Context/ContextFilter";

function AllCategoriesLink() {
    const { dispath } = useContext(FilterDispath);
    const navigate = useNavigate()
    
    return (
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
    );
}

export default AllCategoriesLink;