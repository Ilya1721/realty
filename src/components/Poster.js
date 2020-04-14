import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Poster(props) {
  const poster = props.poster;
  const photoUrl = poster.beautiful_url.substring(
    0,
    poster.beautiful_url.lastIndexOf("-")
  );

  let photoId = null;
  const [photoSrc, setPhotoSrc] = useState(undefined);

  if (poster.photos !== undefined && photoSrc === undefined) {
    photoId = Object.keys(poster.photos)[0];
    setPhotoSrc(
      `https://cdn.riastatic.com/photosnew/dom/photo/${photoUrl}__${photoId}fl.jpg`
    );
  }
  var dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };
  const localStorage = window.localStorage;
  let isInWish = false;
  if (localStorage.getItem("wishList") !== null) {
    const list = JSON.parse(localStorage.getItem("wishList"));
    const ids = list.map(item => item._id);
    isInWish = ids.includes(poster._id);
  }
  const [checked, setChecked] = useState(isInWish);

  function setStyle() {
    return checked ? "checked" : "";
  }

  function handleCheck() {
    setChecked(!checked);
    if (!checked) {
      props.addToWishList(poster);
    } else {
      props.deleteFromWishList(poster);
    }
  }

  function onImgError() {
    setPhotoSrc("./no-image.png");
  }

  return (
    <div className="poster">
      <div className="img-div">
        <Link to={`/poster/${poster.realty_id}`}>
          <img src={photoSrc} onError={onImgError} alt="img" />
        </Link>
      </div>
      <div className="info-div">
        <div className="name-div">
          <div className="name">
            <Link to={`/poster/${poster.realty_id}`}>
              {poster.district_type_name || ""} {poster.district_name || ""}{" "}
              {poster.street_name || ""}
            </Link>
          </div>
          <div>
            <button type="button" onClick={handleCheck} className="star-button">
              <i className={`fa fa-star ${setStyle()}`}></i>
            </button>
          </div>
        </div>
        <div className="price">
          {poster.priceArr[1]} {poster.currency_type}
          <span className="second-part">
            <i className="fas fa-circle"></i>
            <span className="alt">{poster.priceArr[3]} грн</span>
          </span>
        </div>
        <div className="rooms">
          {poster.rooms_count} комнат
          <span className="second-part">
            <i className="fas fa-circle"></i>
            <span className="alt">
              {poster.total_square_meters} м<sup>2</sup>
            </span>
          </span>
        </div>
        <div className="description">
          {(poster.description && poster.description.substring(0, 40)) ||
            (poster.description_uk && poster.description_uk.substring(0, 40))}
          ...
        </div>
        <div className="date">
          <i className="far fa-clock"></i>
          {new Date(Date.parse(poster.publishing_date)).toLocaleString(
            "ru-RU",
            dateOptions
          )}
        </div>
      </div>
    </div>
  );
}

export default Poster;
