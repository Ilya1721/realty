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
      "https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=4&city_id=4&page=1&characteristic[242]=239&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill"
    );
  }
  if (localStorage.getItem("rooms") === null) {
    localStorage.setItem(
      "rooms",
      JSON.stringify([
        {
          value: "1",
          clicked: false,
        },
        {
          value: "2",
          clicked: false,
        },
        {
          value: "3",
          clicked: false,
        },
        {
          value: "4+",
          clicked: false,
        },
      ])
    );
  }
  if (localStorage.getItem("price") === null) {
    localStorage.setItem(
      "price",
      JSON.stringify({
        from: "0",
        to: "0",
      })
    );
  }
  if (localStorage.getItem("currency") === null) {
    localStorage.setItem(
      "currency",
      JSON.stringify([
        {
          index: 1,
          value: 239,
          text: "$",
        },
        {
          index: 2,
          value: 241,
          text: "€",
        },
        {
          index: 3,
          value: 240,
          text: "грн.",
        },
      ])
    );
  }
  if (localStorage.getItem("currentCurrency") === null) {
    localStorage.setItem(
      "currentCurrency",
      JSON.stringify({
        index: 1,
        value: 239,
        text: "$",
      })
    );
  }

  const addToWishList = (poster) => {
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    if (wishList !== null) {
      const ids = wishList.map((item) => item._id);
      if (!ids.includes(poster._id)) {
        localStorage.setItem("wishList", JSON.stringify([...wishList, poster]));
      }
    } else {
      localStorage.setItem("wishList", JSON.stringify([poster]));
    }
  };

  const deleteFromWishList = (poster) => {
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    localStorage.setItem(
      "wishList",
      JSON.stringify(wishList.filter((item) => item._id !== poster._id))
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
