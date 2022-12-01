import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ROUTES } from "./helpers/route";

/**
 * Компонент для маршрутизации react-router-dom
 */
const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {ROUTES?.map((item) => (
          <Route key={item.id} path={item.link} element={item.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
