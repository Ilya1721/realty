import React from "react";
import { Route } from "react-router-dom";

import "./css/main.css";
import Header from "./components/Header";
import Home from "./components/Home";
import WishList from "./components/WishList";
import Details from "./components/Details";

function App() {
  const localStorage = window.localStorage;

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
