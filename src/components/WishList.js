import React from "react";

import Poster from "./Poster";

function WishList(props) {
  const posters = JSON.parse(localStorage.getItem("wishList"));
  if (posters !== null) {
    return (
      <div className="home">
        <div className="filter-div">
          <div className="propos-div">
            <span id="number">{posters.length}</span> предложений
          </div>
        </div>
        <div className="poster-div">
          {posters.map((item) => (
            <Poster
              key={item._id}
              addToWishList={props.addToWishList}
              deleteFromWishList={props.deleteFromWishList}
              poster={item}
              isInWish={true}
              priceAndCurrency={{
                priceIndex: JSON.parse(localStorage.getItem("currentCurrency"))
                  .index,
                currency: JSON.parse(localStorage.getItem("currentCurrency")),
              }}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="home">Список обраних пустий</div>;
  }
}

export default WishList;
