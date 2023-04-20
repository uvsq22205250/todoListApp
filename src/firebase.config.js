// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, query, doc, getDoc, setDoc, addDoc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7SbooG70956-V1hMeCD271VCjp8x8zSk",
  authDomain: "todolist-d2b1f.firebaseapp.com",
  projectId: "todolist-d2b1f",
  storageBucket: "todolist-d2b1f.appspot.com",
  messagingSenderId: "673745590218",
  appId: "1:673745590218:web:7c77002725a4c105e5e133",
  measurementId: "G-XJMTFGC14S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*
const db = getFirestore(app);

const Firebase = {
  todos: () => {
      //return db.collection('todos')
      return query(collection(db, 'todos'))
  },
  addTodos: async (tache) => {
      //return db.collection('todos').add({ tache })
     // return query(collection(db, 'todos'))
      //return getFirestore.collection('todos').addd({ tache })
      // Add a new document in collection "cities"
      return await addDoc(collection(db, 'todos'), { 
        name: tache.name,
        date: tache.date,
        reminder: tache.reminder,
        completed: tache.completed
      });
  },
  updateTodo: async (id, tache) => {
    const todo = doc(db, 'todos', id);
    const updateFields = { name : tache };
    return await updateDoc(todo, updateFields);
  },
  deleteTodo: async (id) => {
    //const todo = getDoc(collection(db, 'todos', id))
    const todo = doc(db, 'todos', id)
    return await deleteDoc(todo);
  },
  completedTodo: async (id) => {
    const todo = doc(db, 'todos', id);
    const updateFields = { completed : true };
    return await updateDoc(todo, updateFields);
  },
  reminderTodo: async (id) => {
    const todo = doc(db, 'todos', id);
    const updateFields = { reminder : true };
    return await updateDoc(todo, updateFields);
  }
}
*/

export const auth = getAuth(app);
export default app

