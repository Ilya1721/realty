import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import MainInfo from "./MainInfo";
import Characteristics from "./Characteristics";

function Details(props) {
  let { id } = useParams();
  const [poster, setPoster] = useState();
  const localStorage = window.localStorage;
  const [checked, setChecked] = useState(false);
  const [photos, setPhotos] = useState(["../no-image.png"]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const MAIN_INFO = "mainInfo";
  const CHARACTERISTICS = "characteristics";
  const [currentTab, setCurrentTab] = useState(MAIN_INFO);

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

  function photoLeft() {
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    }
  }

  function photoRight() {
    if (photoIndex < photos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    }
  }

  function onMainInfoTab() {
    if (currentTab !== MAIN_INFO) {
      setCurrentTab(MAIN_INFO);
    }
  }

  function onCharacteristicsTab() {
    if (currentTab !== CHARACTERISTICS) {
      setCurrentTab(CHARACTERISTICS);
    }
  }

  function setTabText() {
    if (currentTab === MAIN_INFO) return <MainInfo poster={poster} />;
    else if (currentTab === CHARACTERISTICS)
      return <Characteristics poster={poster} />;
  }

  function setMainInfoStyle() {
    if (currentTab === MAIN_INFO) {
      return "checked";
    }
  }

  function setCharacteristicsStyle() {
    if (currentTab === CHARACTERISTICS) {
      return "checked";
    }
  }

  function onImgError() {
    setPhotos(["../no-image.png"]);
    setImgError(true);
  }

  useEffect(() => {
    axios
      .get(
        `https://developers.ria.com/dom/info/${id}?api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
      )
      .then(res => {
        setPoster(res.data);
        const photoUrl = res.data.beautiful_url.substring(
          0,
          res.data.beautiful_url.lastIndexOf("-")
        );
        let posterPhotos = ["../no-image.png"];
        if (res.data.photos !== undefined && !imgError) {
          posterPhotos = Object.keys(res.data.photos).map(
            id =>
              `https://cdn.riastatic.com/photosnew/dom/photo/${photoUrl}__${id}fl.jpg`
          );
        }
        setPhotos(posterPhotos);
        //console.log(photos);
        const list = JSON.parse(localStorage.getItem("wishList"));
        const ids = list.map(item => item._id);
        setChecked(ids.includes(res.data._id));
      })
      .catch(err => console.log(err));
  }, [id]);

  if (poster !== undefined) {
    return (
      <div className="details">
        <div className="details-header">
          <div className="star">
            <button type="button" onClick={handleCheck} className="star-button">
              <i className={`fa fa-star ${setStyle()}`}></i>
            </button>
          </div>
          <div className="name">
            {poster.rooms_count} комнатная квартира {poster.total_square_meters}{" "}
            кв.м. {poster.district_type_name || ""} {poster.district_name || ""}{" "}
            {poster.street_name || ""}
          </div>
        </div>
        <div id="photo-header">Фото</div>
        <div className="slider">
          <div className="container">
            <img src={photos[photoIndex]} onError={onImgError} alt="img" />
            <button onClick={photoLeft} className="btn-left">
              <i className="fas fa-arrow-left"></i>
            </button>
            <button onClick={photoRight} className="btn-right">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="tabs">
          <div className="button-div">
            <button
              onClick={onMainInfoTab}
              type="button"
              className={`tab-btn ${setMainInfoStyle()}`}
            >
              Основна інформація
            </button>
            <button
              onClick={onCharacteristicsTab}
              type="button"
              className={`tab-btn ${setCharacteristicsStyle()}`}
            >
              Характеристики
            </button>
          </div>
          {setTabText()}
        </div>
      </div>
    );
  } else {
    return <div className="details">Loading...</div>;
  }
}

export default Details;
