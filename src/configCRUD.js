import { collection, query, doc, getDoc, setDoc, addDoc, getFirestore, deleteDoc, updateDoc, where } from "firebase/firestore";
import app from './firebase.config';

const db = getFirestore(app);
const Firebase = {
    todos: () => {
      

      return query(collection(db, 'todos'))
    },
    addTodos: async (tache, uid) => {
        
        return await addDoc(collection(db, 'todos'), { 
          name: tache.name,
          date: tache.date,
          reminder: tache.reminder,
          completed: tache.completed,
          userId : uid
        });
    },
    updateTodo: async (id, tache) => {
      const todo = doc(db, 'todos', id);
      const updateFields = { name : tache };
      return await updateDoc(todo, updateFields);
    },
    deleteTodo: async (id) => {
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