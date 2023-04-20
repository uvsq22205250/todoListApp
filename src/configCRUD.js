import { collection, query, doc, getDoc, setDoc, addDoc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";
import app from './firebase.config';

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
  
  export default Firebase