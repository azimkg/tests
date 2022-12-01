import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  /**
   * Компонент для создания маршрутов(ссылок) между страницами(компонетами)
   */
  return (
    <div className="navbar">
      <div className="container navbar_item">
        <Link style={{ textDecoration: "none" }} to="/">
          <p className="navbar_route">Главная</p>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/create">
          <p className="navbar_route">Добавить задачу</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
