import React from "react";
import { Link } from "react-router-dom";

function Poster(props) {
  const poster = props.poster;

  return (
    <div className="poster">
      <Link to={`/poster/${poster._id}`}>
        <img src="./img/flat.jfif" alt="img" />
      </Link>
      <div className="name-div">
        <div className="name">
          <Link to={`/poster/${poster._id}`}>{poster.street_name}</Link>
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
        {poster.rooms_count} комнат
        <span className="second-part">
          <i className="fas fa-circle"></i>
          <span className="alt">
            41 м<sup>2</sup>
          </span>
        </span>
      </div>
      <div className="description">{poster.description}</div>
      <div className="date">
        <i className="far fa-clock"></i>04.04.2020
      </div>
    </div>
  );
}

export default Poster;
