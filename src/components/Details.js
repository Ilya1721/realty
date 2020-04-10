import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Details(props) {
  let { id } = useParams();
  const [poster, setPoster] = useState();
  const localStorage = window.localStorage;
  let isInWish = false;
  if (localStorage.getItem("wishList") !== null && poster !== undefined) {
    const list = JSON.parse(localStorage.getItem("wishList"));
    const ids = list.map(item => item._id);
    isInWish = ids.includes(poster._id);
  }
  const [checked, setChecked] = useState(isInWish);
  const [photos, setPhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

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

  useEffect(() => {
    /*const fetchData = async () => {
      const res = await axios
        .get(
          `https://developers.ria.com/dom/info/${id}?api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
        )
        .catch(err => console.log(err));
      setPoster(res.data);
    };
    fetchData();*/
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
        const photos = Object.keys(res.data.photos).map(
          id =>
            `https://cdn.riastatic.com/photosnew/dom/photo/${photoUrl}__${id}fl.jpg`
        );
        setPhotos(photos);
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
            кв.м. {poster.district_type_name} {poster.district_name}{" "}
            {poster.street_name}
          </div>
        </div>
        <div id="photo-header">Фото</div>
        <div className="slider">
          <div className="container">
            <img src={photos[photoIndex]} alt="img" />
            <button onClick={photoLeft} className="btn-left">
              <i className="fas fa-arrow-left"></i>
            </button>
            <button onClick={photoRight} className="btn-right">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="details">Loading...</div>;
  }
}

export default Details;