import React from "react";
import { withRouter } from "react-router";
import { getOne } from "../api";

import MainInfo from "./MainInfo";
import Characteristics from "./Characteristics";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: {},
      checked: false,
      photos: ["../no-image.png"],
      photoIndex: 0,
      imgError: false,
      MAIN_INFO: "mainInfo",
      CHARACTERISTICS: "characteristics",
      currentTab: "mainInfo",
    };
  }

  setStyle = () => {
    return this.state.checked ? "checked" : "";
  };

  handleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
    if (!this.state.checked) {
      this.props.addToWishList(this.state.poster);
    } else {
      this.props.deleteFromWishList(this.state.poster);
    }
  };

  photoLeft = () => {
    if (this.state.photoIndex > 0) {
      this.setState({
        photoIndex: this.state.photoIndex - 1,
      });
    }
  };

  photoRight = () => {
    if (this.state.photoIndex < this.state.photos.length - 1) {
      this.setState({
        photoIndex: this.state.photoIndex + 1,
      });
    }
  };

  onMainInfoTab = () => {
    if (this.state.currentTab !== this.state.MAIN_INFO) {
      this.setState({
        currentTab: this.state.MAIN_INFO,
      });
    }
  };

  onCharacteristicsTab = () => {
    if (this.state.currentTab !== this.state.CHARACTERISTICS) {
      this.setState({
        currentTab: this.state.CHARACTERISTICS,
      });
    }
  };

  setTabText = () => {
    if (this.state.currentTab === this.state.MAIN_INFO)
      return <MainInfo poster={this.state.poster} />;
    else if (this.state.currentTab === this.state.CHARACTERISTICS)
      return <Characteristics poster={this.state.poster} />;
  };

  setMainInfoStyle = () => {
    if (this.state.currentTab === this.state.MAIN_INFO) {
      return "checked";
    }
  };

  setCharacteristicsStyle = () => {
    if (this.state.currentTab === this.state.CHARACTERISTICS) {
      return "checked";
    }
  };

  onImgError = () => {
    this.setState({
      photos: ["../no-image.png"],
      imgError: true,
    });
  };

  componentDidMount() {
    getOne(
      `https://developers.ria.com/dom/info/${this.props.match.params.id}?api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`,
      this.state.imgError
    ).then((res) =>
      this.setState({
        poster: res.poster,
        photos: res.photos,
        checked: res.checked,
      })
    );
  }

  render() {
    if (this.state.poster.realty_id !== undefined) {
      return (
        <div className="details">
          <div className="details-header">
            <div className="star">
              <button
                type="button"
                onClick={this.handleCheck}
                className="star-button"
              >
                <i className={`fa fa-star ${this.setStyle()}`}></i>
              </button>
            </div>
            <div className="name">
              {this.state.poster.rooms_count} комнатная квартира{" "}
              {this.state.poster.total_square_meters} кв.м.{" "}
              {this.state.poster.district_type_name || ""}{" "}
              {this.state.poster.district_name || ""}{" "}
              {this.state.poster.street_name || ""}
            </div>
          </div>
          <div id="photo-header">Фото</div>
          <div className="slider">
            <div className="container">
              <img
                src={this.state.photos[this.state.photoIndex]}
                onError={this.onImgError}
                alt="img"
              />
              <button onClick={this.photoLeft} className="btn-left">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button onClick={this.photoRight} className="btn-right">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="tabs">
            <div className="button-div">
              <button
                onClick={this.onMainInfoTab}
                type="button"
                className={`tab-btn ${this.setMainInfoStyle()}`}
              >
                Основна інформація
              </button>
              <button
                onClick={this.onCharacteristicsTab}
                type="button"
                className={`tab-btn ${this.setCharacteristicsStyle()}`}
              >
                Характеристики
              </button>
            </div>
            {this.setTabText()}
          </div>
        </div>
      );
    } else {
      return <div className="details">Loading...</div>;
    }
  }
}

export default withRouter(Details);
