import React, { useState, useEffect } from "react";
import { getCharactArr } from "../api";

function Characteristics(props) {
  const [characteristics, setCharacteristics] = useState([]);
  const poster = props.poster;

  useEffect(() => {
    getCharactArr(
      "https://developers.ria.com/dom/options?category=1&realty_type=2&operation_type=1&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill"
    )
      .then((res) => setCharacteristics(res))
      .catch((err) => console.log(err));
    /*axios
      .get(
        "https://developers.ria.com/dom/options?category=1&realty_type=2&operation_type=1&api_key=JdDY2bvaHSqTjAN5siRZY03ekOMdMjYhBrrjlill"
      )
      .then((res) => setCharacteristics(res.data))
      .catch((err) => console.log(err));*/
  }, []);

  if (characteristics) {
    let items = characteristics.map((characteristic) => characteristic.items);
    let itemObjects = [];
    items.forEach((arr) => arr.map((item) => itemObjects.push(item)));
    itemObjects = itemObjects.filter((item) =>
      Object.keys(poster.characteristics_values).includes(
        item.characteristic_id.toString()
      )
    );

    const characteristicArr = itemObjects.map((item) => {
      let value = poster.characteristics_values[item.characteristic_id];
      if (value !== undefined) {
        if (item.characteristic_id === value) {
          value = item.name;
        }
        if (item.children !== undefined && item.children !== []) {
          if (item.children[value] !== undefined) {
            value = item.children[value].name;
          }
        }

        const sufix = item.sufix || "";

        return {
          type: item.name,
          value: value,
          sufix: sufix,
        };
      }
    });

    return (
      <div className="charact-div">
        <div className="left">
          {characteristicArr.map((item) => (
            <div key={item.type}>
              <i className="fas fa-check"></i> {item.type}
            </div>
          ))}
        </div>
        <div className="right">
          {characteristicArr.map((item) => (
            <div key={item.type}>
              {item.value} {item.sufix}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Characteristics;
