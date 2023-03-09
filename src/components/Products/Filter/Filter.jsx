import React, { useContext } from "react";
import { FilterDispath } from "../../Context/ContextFilter";

export default function Filter() {
  const { dispath } = useContext(FilterDispath);
  return (
    <div className="filter_container">
      <div className="filter_btnBox">
        <button onClick={() => dispath({ type: "ALL" })} className="filter_btn">
          All
        </button>
        <button
          onClick={() => dispath({ type: "PILLOWS" })}
          className="filter_btn"
        >
          Pillows
        </button>
        <button
          onClick={() => dispath({ type: "BAGS" })}
          className="filter_btn"
        >
          Bags
        </button>
        <button
          onClick={() => dispath({ type: "USB" })}
          className="filter_btn"
        >
          Flash Drive
        </button>
        <button
          onClick={() => dispath({ type: "TSHIRTS" })}
          className="filter_btn"
        >
          Tshirts
        </button>
        <button
          onClick={() => dispath({ type: "CAPS" })}
          className="filter_btn"
        >
          Caps
        </button>
        <button
          onClick={() => dispath({ type: "MUGS" })}
          className="filter_btn"
        >
          Mugs
        </button>
        <button
          onClick={() => dispath({ type: "TUMBLERS" })}
          className="filter_btn"
        >
          Tumblers
        </button>
      </div>
    </div>
  );
}
