import React from "react";
import { Route } from "react-router-dom";

import "./css/main.css";
import Header from "./components/Header";
import Home from "./components/Home";
import WishList from "./components/WishList";
import Details from "./components/Details";

function App() {
  const localStorage = window.localStorage;
  if (localStorage.getItem("req") === null) {
    localStorage.setItem(
      "req",
      "https://developers.ria.com/dom/search?category=1&operation_type=1&state_id=4&characteristic[234][from]=20000&characteristic[234][to]=20000&characteristic[242]=239&characteristic[273]=273&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill&realty_type=2&city_id=4"
    );
  }
  if (localStorage.getItem("rooms") === null) {
    localStorage.setItem(
      "rooms",
      JSON.stringify([
        {
          value: "1",
          clicked: false
        },
        {
          value: "2",
          clicked: false
        },
        {
          value: "3",
          clicked: false
        },
        {
          value: "4+",
          clicked: false
        }
      ])
    );
  }
  if (localStorage.getItem("price") === null) {
    localStorage.setItem(
      "price",
      JSON.stringify({
        from: "0",
        to: "0"
      })
    );
  }

  const addToWishList = poster => {
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    if (wishList !== null) {
      const ids = wishList.map(item => item._id);
      if (!ids.includes(poster._id)) {
        localStorage.clear();
        localStorage.setItem("wishList", JSON.stringify([...wishList, poster]));
      }
    } else {
      localStorage.setItem("wishList", JSON.stringify([poster]));
    }
  };

  const deleteFromWishList = poster => {
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    localStorage.clear();
    localStorage.setItem(
      "wishList",
      JSON.stringify(wishList.filter(item => item._id !== poster._id))
    );
  };

  return (
    <React.Fragment>
      <Header />
      <Route exact path="/">
        <Home
          addToWishList={addToWishList}
          deleteFromWishList={deleteFromWishList}
        />
      </Route>
      <Route exact path="/wishList">
        <WishList
          addToWishList={addToWishList}
          deleteFromWishList={deleteFromWishList}
        />
      </Route>
      <Route exact path="/poster/:id">
        <Details
          addToWishList={addToWishList}
          deleteFromWishList={deleteFromWishList}
        />
      </Route>
    </React.Fragment>
  );
}

export default App;
