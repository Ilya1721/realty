import React, { useState } from "react";

import RoomButton from "./RoomButton";

function Filter(props) {
  const [price, setPrice] = useState({
    from: "0",
    to: "0"
  });
  const [currencyType, setCurrencyType] = useState("$");
  const [rooms, setRooms] = useState([
    {
      value: "1",
      clicked: false
    },
    {
      value: "2",
      clicked: false
    },
    {
      value: "3",
      clicked: true
    },
    {
      value: "4+",
      clicked: false
    }
  ]);

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
    /*props.setFilter(
      `https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=10&city_id=10&district_id=15187&district_id=15189&district_id=15188&characteristic[209][from]=1&characteristic[209][to]=3&characteristic[214][from]=60&characteristic[214][to]=90&characteristic[216][from]=30&characteristic[216][to]=50&characteristic[218][from]=4&characteristic[218][to]=9&characteristic[227][from]=3&characteristic[227][to]=7&characteristic[443]=442&characteristic[234][from]=${price.from}&characteristic[234][to]=${price.to}&characteristic[242]=239&characteristic[273]=273&characteristic[1437]=1434&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill`
    );*/
    console.log(rooms);
  }

  return (
    <form onSubmit={onSubmit}>
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
        <option value="$">$</option>
        <option value="грн.">грн.</option>
        <option value="€">€</option>
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
