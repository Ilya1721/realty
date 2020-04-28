import React from "react";
import { getAll } from "../api";

import Poster from "./Poster";
import Filter from "./Filter";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isEmpty: false,
      limit: 15,
      req: localStorage.getItem("req"),
    };
  }

  setFilter = (req) => {
    this.setState({
      req: req,
    });
    localStorage.setItem("req", req);
  };

  componentDidMount() {
    getAll(this.state.req, this.state.limit).then((res) =>
      this.setState({
        items: res.items,
        isEmpty: res.isEmpty,
      })
    );
  }

  render() {
    if (this.state.items[0] !== undefined) {
      return (
        <div className="home">
          <div className="filter-div">
            <Filter
              setFilter={this.setFilter}
              itemCount={this.state.items.length}
            />
          </div>
          <div className="poster-div">
            {this.state.items.map((item) => (
              <Poster
                key={item._id}
                addToWishList={this.props.addToWishList}
                deleteFromWishList={this.props.deleteFromWishList}
                poster={item}
              />
            ))}
          </div>
        </div>
      );
    } else if (this.state.isEmpty) {
      return (
        <div className="home">
          <div className="filter-div">
            <Filter
              setFilter={this.setFilter}
              itemCount={this.state.items.length}
            />
          </div>
          <div className="poster-div">Результатів не знайдено</div>
        </div>
      );
    } else {
      return (
        <div className="home">
          <div className="filter-div">
            <Filter
              setFilter={this.setFilter}
              itemCount={this.state.items.length}
            />
          </div>
          <div className="poster-div">Loading...</div>
        </div>
      );
    }
  }
}

export default Home;
