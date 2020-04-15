import React, { useState, useEffect } from "react";
import axios from "axios";

import Poster from "./Poster";
import Filter from "./Filter";

function Home(props) {
  const [state, setState] = useState({
    items: [],
  });

  const [isEmpty, setIsEmpty] = useState(false);
  const limit = 15;

  const localStorage = window.localStorage;
  const [req, setReq] = useState(localStorage.getItem("req"));

  const setFilter = (req) => {
    setReq(req);
    localStorage.setItem("req", req);
  };

  useEffect(() => {
    setState({
      items: [],
    });
    let ids = [];
    let flats = [];
    axios
      .get(req)
      .then((res) => {
        ids = res.data.items;
        if (ids.length > limit) {
          ids.length = limit;
        }
        let reqArr = ids.map((id) =>
          axios.get(
            `https://developers.ria.com/dom/info/${id}?api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
          )
        );
        axios
          .all(reqArr)
          .then((responses) => {
            flats = responses.map((res) => res.data);
            setState({
              items: flats,
            });
            if (flats[0] === undefined) {
              setIsEmpty(true);
            } else {
              setIsEmpty(false);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [req]);

  if (state.items[0] !== undefined) {
    return (
      <div className="home">
        <div className="filter-div">
          <Filter setFilter={setFilter} itemCount={state.items.length} />
        </div>
        <div className="poster-div">
          {state.items.map((item) => (
            <Poster
              key={item._id}
              addToWishList={props.addToWishList}
              deleteFromWishList={props.deleteFromWishList}
              poster={item}
            />
          ))}
        </div>
      </div>
    );
  } else if (isEmpty) {
    return (
      <div className="home">
        <div className="filter-div">
          <Filter setFilter={setFilter} itemCount={state.items.length} />
        </div>
        <div className="poster-div">Результатів не знайдено</div>
      </div>
    );
  } else {
    return (
      <div className="home">
        <div className="filter-div">
          <Filter setFilter={setFilter} itemCount={state.items.length} />
        </div>
        <div className="poster-div">Loading...</div>
      </div>
    );
  }
}

export default Home;
