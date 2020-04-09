import React, { useState, useEffect } from "react";

function RoomButton(props) {
  const [clicked, setClicked] = useState(props.clicked);

  function setStyle() {
    return clicked ? "clicked" : "";
  }

  function handleClick() {
    setClicked(!clicked);
  }

  useEffect(() => {
    if (clicked) {
      props.addRoom(props.value);
    } else {
      props.deleteRoom(props.value);
    }
  }, [clicked]);

  return (
    <button
      className={`room-button ${setStyle()}`}
      onClick={handleClick}
      type="button"
    >
      {props.value}
    </button>
  );
}

export default RoomButton;
