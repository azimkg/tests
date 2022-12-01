import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Переменная в котором хранится API к БД
 */
const firebaseConfig = {
  apiKey: process.env.REACT_API_FIREBASE_KEY,
  authDomain: "react-todo-62c23.firebaseapp.com",
  projectId: "react-todo-62c23",
  storageBucket: "react-todo-62c23.appspot.com",
  messagingSenderId: "660965629453",
  appId: "1:660965629453:web:3257ea30b5bcd52331ff44",
  measurementId: "G-LZENHXZQ4P",
};

/**Для инициализации firebaseConfig
 */
const app = initializeApp(firebaseConfig);
/**
 * Экспортируем переменную db, чтобы легче было работать с ним в других компонентах
 */
export const db = getFirestore(app);
export const storage = getStorage(app);
