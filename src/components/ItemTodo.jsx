import dayjs from "dayjs";
import React, { useState } from "react";
import del from "../assets/delete.png";
import edit from "../assets/edit.png";
import ModalEdit from "./ModalEdit";
import moment from "moment/moment";

/**
 * Компонент для отображения данных в виде карточек
 * @param {object} item пропсы из родительского компонента
 * @param {object} handleDelete функция удаления данных
 * @param {object} fetchData функция получения данных
 */
const ItemTodo = ({ item, handleDelete, fetchData }) => {
  /**
   * Стейты для хранения данных и состояния
   */
  const [isEdit, setIsEdit] = useState(false);
  const [elem, setElem] = useState({});

  /**
   *Фунция модального окна
   * @param {string} todo 'определенный элемент по id
   */
  function handleEdit(todo) {
    setIsEdit(!isEdit);
    setElem(todo);
  }

  /**
   * @param {string} a переменная с датой настоящего времени
   */
  let a = dayjs().format("YYYY MM DD");
  let b = item.timeStamp;

  /**
   * @param {string} today переменная с датой настоящего времени, для получения периода после создания или обновления данных
   *
   */
  let today = moment(b).startOf("day").fromNow();

  return (
    <div className={item.timeStamp !== a ? "one" : "block_card-border"}>
      <div className="block_card-one">
        <img className="block_card-image" src={item.img} alt="image" />
        <h2 className="block_card-title">{item.title}</h2>
        <p className="block_card-time">{today}</p>
      </div>
      <p className="block_card-desc">{item.desc}</p>
      <div className="block_card_icons">
        <img
          width={20}
          style={{ cursor: "pointer" }}
          src={del}
          onClick={() => handleDelete(item.id)}
          alt="delete"
        />
        <img
          width={20}
          onClick={() => handleEdit(item)}
          style={{ cursor: "pointer" }}
          src={edit}
          alt="edit"
        />
      </div>
      {/**
       * при состоянии true стейта isEdit модальное окно откроется, при false все наоборот
       */}
      {isEdit ? (
        <ModalEdit elem={elem} setIsEdit={setIsEdit} fetchData={fetchData} />
      ) : null}
    </div>
  );
};

export default ItemTodo;
