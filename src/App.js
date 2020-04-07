import React from "react";
import { Route } from "react-router-dom";

import "./css/main.css";
import Header from "./components/Header";
import Home from "./components/Home";
import WishList from "./components/WishList";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Route exact path="/">
        <div className="home">
          <Home />
        </div>
      </Route>
      <Route exact path="/wishList">
        <WishList />
      </Route>
    </React.Fragment>
  );
}

export default App;
