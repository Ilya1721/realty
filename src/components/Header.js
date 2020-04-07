import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <span>Вишинський І.О.</span>
        <NavLink exact to="/">
          Головна
        </NavLink>
        <NavLink to="/wishList">Список Обраних</NavLink>
      </div>
    </div>
  );
}

export default Header;
