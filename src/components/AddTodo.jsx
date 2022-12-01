import React, { useEffect, useState } from "react";
import { db, storage } from "../helpers/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import dayjs from "dayjs";

const AddTodo = () => {
  /**
   * Стейты для хранения состояния
   */
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);
  const [data, setData] = useState({ title: "", desc: "" });

  /**
   *
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
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  /**
   * Функция, для собирания данных в один обЪект data из инпутов
   * @param {string} e это объект, в котором хранятся значения вееденных нами данных в инпут
   * Так, как нельзя менять стейты напрямую(это плохая практика), мы меняем его копируя данные в новый объект и передаем новый объект в в функцию setDate
   */
  const handleInput = (e) => {
    let values = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setData(values);
  };

  /**
   * Функция отправления данных в БД
   * @param {string} e это событие, один из методов как раз позволяет отменить действие браузера по умолчанию
   * @returns если, проверка не пройдена, на этом функция останавливается и всплывает alert
   */
  const handleValue = async (e) => {
    e.preventDefault();
    if (data.title == "" || data.desc == "") {
      return alert("Заполните все поля!");
    }
    try {
      const res = await addDoc(collection(db, "item"), {
        ...data,
        timeStamp: dayjs().format("YYYY MM DD"),
      });
    } catch (e) {
      console.log(e);
    }
    setData({
      title: "",
      desc: "",
      img: "",
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleValue} className="form_input">
        <input
          className="form_input-inputs"
          type="text"
          name="title"
          value={data.title}
          placeholder="Введите название todo"
          onChange={handleInput}
        />
        <input
          className="form_input-inputs"
          type="text"
          name="desc"
          value={data.desc}
          placeholder="Добавьте описание"
          onChange={handleInput}
        />
        <input
          className="form_input-inputs file"
          type="file"
          placeholder="Выберите файл"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="form_input-button"
          disabled={perc !== null && perc < 100}
          type="submit"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
