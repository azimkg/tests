import dayjs from "dayjs";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../helpers/firebase";

/**
 * Компонент для редактирования данных
 * @param {object} elem пропс из другого компонента, в виде объектов
 * для изменения отдельного изменения
 * @param {object} setIsEdit функция закрытия и открытия модального окна
 * @param {object} fetchData функция, получения данных для обновления отображаемых элементов, после редактирования
 * @returns
 */
const ModalEdit = ({ elem, setIsEdit, fetchData }) => {
  /**
   * Стейты для хранения данных
   */
  const [values, setValues] = useState("");
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);

  /**
   * @param {string} file стейт эффекта, чтобы следить за состоянием, чтобы при добавлении фото он автоматически добавлялся в стейт data под ключом img
   */
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setValues((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  /**
   * стейт эффекта, который чистит данные ключа img при его изменении
   */
  useEffect(() => {
    setValues(elem, (elem.img = ""));
  }, [elem]);

  /**
   * Функция, для собирания данных в один обЪект data из инпутов
   * @param {string} e это объект, в котором хранятся значения вееденных нами данных в инпут
   * Так, как нельзя менять стейты напрямую(это плохая практика), мы меняем его копируя данные в новый объект и передаем новый объект в в функцию setValues
   */
  const handleInput = (e) => {
    let val = {
      ...values,
      [e.target.name]: e.target.value,
    };
    setValues(val);
  };

  /**
   * Асинхронная функция, для изменения данных в БД, после редактирования
   */
  async function handleChangeInput() {
    try {
      await updateDoc(doc(db, "item", values.id), {
        ...values,
        timeStamp: dayjs().format("YYYY MM DD"),
      });
    } catch (e) {
      console.log(e);
    }
    fetchData();
    setIsEdit(false);
  }

  return (
    <>
      <div className="modal_main">
        <div className="modal_main-block">
          <input
            className="modal_input"
            type="text"
            value={values.title}
            name="title"
            onChange={handleInput}
          />
          <input
            className="modal_input"
            type="text"
            value={values.desc}
            name="desc"
            onChange={handleInput}
          />
          <input
            className="form_input-inputs file"
            type="file"
            placeholder="Выберите файл"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="modal_button" onClick={() => handleChangeInput()}>
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalEdit;
