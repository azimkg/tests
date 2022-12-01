import AddTodoPage from "../pages/AddTodoPage";
import MainPage from "../pages/MainPage";

/**
 * Массив с объектами для маршрутов
 */
export const ROUTES = [
  { id: 1, link: "/", element: <MainPage /> },
  { id: 2, link: "/create", element: <AddTodoPage /> },
];
