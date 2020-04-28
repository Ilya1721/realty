import React from "react";

function MainInfo(props) {
  const poster = props.poster;
  const currency = JSON.parse(localStorage.getItem("currentCurrency"));

  return (
    <div>
      <div className="description">
        <div className="info-header">Опис</div>
        <div className="desc-body">
          {poster.description || poster.description_uk}
        </div>
      </div>
      <div className="price">
        <div className="info-header">Ціна</div>
        <div className="price-body">
          {poster.priceArr[currency.index]} {currency.text}
          <span className="second-part">
            <i className="fas fa-circle"></i>
            <span className="alt">{poster.priceArr[3]} грн</span>
          </span>
        </div>
      </div>
      <div className="address">
        <div className="info-header">Адреса</div>
        <div className="address-body">
          {`${poster.district_name || ""} ${poster.district_type_name || ""}
            ${poster.street_name || ""} / ${poster.building_number_str || ""}`}
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
