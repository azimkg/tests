import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../helpers/firebase";
import ItemTodo from "./ItemTodo";

const ListTodos = () => {
  /**
   * Стейт для хранения данных
   */
  const [data, setData] = useState([]);

  /**
   * Функция для получения данных
   * получая данные, пушим в массив
   * и передаем в функция setData для хранения данных
   */
  const fetchData = async () => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "item"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * стейт ффекта, который срабатывает при первоя загрузке страницы
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Функция удаление по ID из БД
   * @param {string} id id определенного элемента для точного удаления
   * с помощью метода filter мы удаляем элемент из массива и БД
   */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "item", id));
      setData(data.filter((item) => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <h3 className="problem_text">План дня:</h3>
      <div className="block">
        <div className="block_card">
          {/**  Отображение элементов из БД, перебираем с помощью метода массивов map() */}
          {data?.map((item) => (
            <ItemTodo
              item={item}
              key={item.id}
              handleDelete={handleDelete}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListTodos;
