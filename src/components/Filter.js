import React, { useState } from "react";

import RoomButton from "./RoomButton";

function Filter(props) {
  const localStorage = window.localStorage;
  const [price, setPrice] = useState(JSON.parse(localStorage.getItem("price")));
  const [rooms, setRooms] = useState(JSON.parse(localStorage.getItem("rooms")));
  const [currencies, setCurrencies] = useState(
    JSON.parse(localStorage.getItem("currency"))
  );
  const [currentCurrency, setCurrentCurrency] = useState(
    JSON.parse(localStorage.getItem("currentCurrency"))
  );
  const otherCurrencies = currencies.filter(
    (c) => c.value !== JSON.parse(currentCurrency.value)
  );

  function onChangeFrom(e) {
    if (e.target.value !== "") {
      setPrice({
        from: parseInt(e.target.value),
        to: price.to,
      });
    } else {
      setPrice({
        from: "0",
        to: price.to,
      });
    }
  }

  function onChangeTo(e) {
    if (e.target.value !== "") {
      setPrice({
        from: price.from,
        to: parseInt(e.target.value),
      });
    } else {
      setPrice({
        from: price.from,
        to: "0",
      });
    }
  }

  function addRoom(roomValue) {
    setRooms(
      rooms.map((room) => {
        if (room.value === roomValue) {
          return {
            value: room.value,
            clicked: true,
          };
        } else {
          return room;
        }
      })
    );
  }

  function deleteRoom(roomValue) {
    setRooms(
      rooms.map((room) => {
        if (room.value === roomValue) {
          return {
            value: room.value,
            clicked: false,
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
      .filter((room) => room.clicked === true)
      .map((room) => parseInt(room.value));
    if (roomsAll[0] === undefined) {
      roomsAll = rooms
        .map((room) => ({
          value: parseInt(room.value),
          clicked: true,
        }))
        .map((item) => item.value);
    }
    const currencyType = e.target.currency_type.value;
    const roomFrom = Math.min(...roomsAll);
    const roomTo = Math.max(...roomsAll);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    localStorage.setItem("price", JSON.stringify(price));
    localStorage.setItem(
      "currentCurrency",
      JSON.stringify({
        index: currencies.find((c) => c.value === JSON.parse(currencyType))
          .index,
        value: currencyType,
        text: currencies.find((c) => c.value === JSON.parse(currencyType)).text,
      })
    );
    props.setFilter(
      `https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=4&city_id=4&page=1&characteristic[234][from]=${price.from}&characteristic[234][to]=${price.to}&characteristic[209][from]=${roomFrom}&characteristic[209][to]=${roomTo}&characteristic[242]=${currencyType}&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
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
      <select name="currency_type">
        <option value={currentCurrency.value}>{currentCurrency.text}</option>
        {otherCurrencies.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.text}
          </option>
        ))}
      </select>
      <label htmlFor="rooms_count" id="room-label">
        Комнат
      </label>
      {rooms.map((room) => (
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
