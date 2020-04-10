import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./css/main.css";
import Header from "./components/Header";
import Home from "./components/Home";
import WishList from "./components/WishList";

function App() {
  const localStorage = window.localStorage;
  //localStorage.setItem("wishList", JSON.stringify([""]));
  //console.log(wishList.items);
  console.log(JSON.parse(localStorage.getItem("wishList")));
  //localStorage.clear();

  const addToWishList = poster => {
    console.log(`adding to wish list ${poster._id}`);
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
    console.log(`deleting from wish list ${poster._id}`);
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
    </React.Fragment>
  );
}

export default App;
