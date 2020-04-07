import React from "react";
import { Link } from "react-router-dom";

function Poster() {
  return (
    <div className="poster">
      <Link to="/poster/1">
        <img src="./img/flat.jfif" alt="img" />
      </Link>
      <div className="name-div">
        <div className="name">
          <Link to="/poster/1">р‑н. Озерная г. Хмельницкий</Link>
        </div>
        <div>
          <button type="button">Add to wish list</button>
        </div>
      </div>
      <div className="price">
        700 грн
        <span className="second-part">
          <i className="fas fa-circle"></i>
          <span className="alt">26$</span>
        </span>
      </div>
      <div className="rooms">
        1 комната
        <span className="second-part">
          <i className="fas fa-circle"></i>
          <span className="alt">
            41 м<sup>2</sup>
          </span>
        </span>
      </div>
      <div className="description">
        Квартира без ремонту, стяжка, індивідуальне опалення
      </div>
      <div className="date">
        <i className="far fa-clock"></i>04.04.2020
      </div>
    </div>
  );
}

export default Poster;
