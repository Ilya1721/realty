import React, { useState } from "react";

import RoomButton from "./RoomButton";

function Filter(props) {
  const localStorage = window.localStorage;
  const [price, setPrice] = useState(JSON.parse(localStorage.getItem("price")));
  const [currencyType, setCurrencyType] = useState("239");
  const [rooms, setRooms] = useState(JSON.parse(localStorage.getItem("rooms")));

  function onChangeFrom(e) {
    if (e.target.value !== "") {
      setPrice({
        from: parseInt(e.target.value),
        to: price.to
      });
    } else {
      setPrice({
        from: "0",
        to: price.to
      });
    }
  }

  function onChangeTo(e) {
    if (e.target.value !== "") {
      setPrice({
        from: price.from,
        to: parseInt(e.target.value)
      });
    } else {
      setPrice({
        from: price.from,
        to: "0"
      });
    }
  }

  function onCurrencyChange(e) {
    setCurrencyType(e.target.value);
  }

  function addRoom(roomValue) {
    setRooms(
      rooms.map(room => {
        if (room.value === roomValue) {
          return {
            value: room.value,
            clicked: true
          };
        } else {
          return room;
        }
      })
    );
  }

  function deleteRoom(roomValue) {
    setRooms(
      rooms.map(room => {
        if (room.value === roomValue) {
          return {
            value: room.value,
            clicked: false
          };
        } else {
          return room;
        }
      })
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    let roomsAll = rooms
      .filter(room => room.clicked === true)
      .map(room => parseInt(room.value));
    if (roomsAll[0] === undefined) {
      roomsAll = rooms
        .map(room => ({
          value: parseInt(room.value),
          clicked: true
        }))
        .map(item => item.value);
    }
    console.log(roomsAll);
    const roomFrom = Math.min(...roomsAll);
    const roomTo = Math.max(...roomsAll);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    localStorage.setItem("price", JSON.stringify(price));
    console.log(roomFrom);
    console.log(roomTo);
    props.setFilter(
      `https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=4&city_id=4&page=1&characteristic[234][from]=${price.from}&characteristic[234][to]=${price.to}&characteristic[209][from]=${roomFrom}&characteristic[209][to]=${roomTo}&characteristic[242]=${currencyType}&characteristic[273]=273&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="propos-div">
        <span id="number">{props.itemCount}</span> предложений
      </div>
      <label htmlFor="priceFrom" id="price-label">
        Цена
      </label>
      <input
        id="priceFrom"
        value={price.from}
        onChange={onChangeFrom}
        name="priceFrom"
        type="text"
      />
      <input
        id="priceTo"
        value={price.to}
        onChange={onChangeTo}
        name="priceTo"
        type="text"
      />
      <select
        value={currencyType}
        onChange={onCurrencyChange}
        name="currency_type"
      >
        <option value="239">$</option>
        <option value="240">грн.</option>
        <option value="241">€</option>
      </select>
      <label htmlFor="rooms_count" id="room-label">
        Комнат
      </label>
      {rooms.map(room => (
        <RoomButton
          clicked={room.clicked}
          key={room.value}
          value={room.value}
          addRoom={addRoom}
          deleteRoom={deleteRoom}
        />
      ))}
      <div className="submit-div">
        <input type="submit" value="Filter" />
      </div>
    </form>
  );
}

export default Filter;
