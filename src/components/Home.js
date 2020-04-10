import React, { useState, useEffect } from "react";
import axios from "axios";

import Poster from "./Poster";
import Filter from "./Filter";

function Home(props) {
  const [state, setState] = useState({
    items: []
  });

  const [req, setReq] = useState(
    "https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=10&city_id=10&district_id=15187&district_id=15189&district_id=15188&characteristic[209][from]=1&characteristic[209][to]=3&characteristic[214][from]=60&characteristic[214][to]=90&characteristic[216][from]=30&characteristic[216][to]=50&characteristic[218][from]=4&characteristic[218][to]=9&characteristic[227][from]=3&characteristic[227][to]=7&characteristic[443]=442&characteristic[234][from]=20000&characteristic[234][to]=90000&characteristic[242]=239&characteristic[273]=273&characteristic[1437]=1434&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill"
  );

  const setFilter = req => {
    setReq(req);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(req).catch(err => console.log(err));
      const ids = res.data.items;
      let flats = [];
      for (const item of ids) {
        const res = await axios
          .get(
            `https://developers.ria.com/dom/info/${item}?api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
          )
          .catch(err => console.log(err));
        flats.push(res.data);
      }
      console.log(flats);
      setState({
        items: flats
      });
    };
    fetchData();
  }, [req]);

  if (state.items[0] !== undefined) {
    return (
      <div className="home">
        <div className="filter-div">
          <Filter setFilter={setFilter} itemCount={state.items.length} />
        </div>
        <div className="poster-div">
          {state.items.map(item => (
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
  } else {
    return <div className="home">Loading...</div>;
  }
}

export default Home;
