import { collection, query, doc, getDoc, setDoc, addDoc, getFirestore, deleteDoc, updateDoc, where, FieldValue } from "firebase/firestore";
import app from './firebase.config';

const db = getFirestore(app);
const Firebase = {
    todos: () => {
      // Create a query against the collection.
      //const todos = query(collection(db, 'todos'));
      //const q = query(todos, where("userId", "==", uid));
      //console.log(q)

      return query(collection(db, 'todos'));
    },
    chats: (email) => {
      return query(collection(db, "chats",  where("users", "array-contains", email)));
    },
    chat: (id) => {
      return query(collection(db, "chats", id));
    },
    users: () => {
      return query(collection(db, "users"));
    },
    addUser: async (email) => {
      return await addDoc(collection(db, 'users'), { 
        email: email,
      });
    },
    addTodos: async (tache, uid) => {
        //return db.collection('todos').add({ tache })
       // return query(collection(db, 'todos'))
        //return getFirestore.collection('todos').addd({ tache })
        // Add a new document in collection "cities"
        return await addDoc(collection(db, 'todos'), { 
          name: tache.name,
          date: tache.date,
          reminder: tache.reminder,
          completed: tache.completed,
          userId : uid
        });
    },
    addChat: async (id, email1, email2) => {
      return await addDoc(collection(db, 'chats', id), { 
        receiverHasRead: false,
        users: [email1, email2],
        messages: [],
      });
    },
    updateTodo: async (id, tache) => {
      const todo = doc(db, 'todos', id);
      const updateFields = { name : tache };
      return await updateDoc(todo, updateFields);
    },
    updateChat: async (id) => {
      const chat = doc(db, 'chats', id);
      const updateFields = { receiverHasRead: true };
      return await updateDoc(chat, updateFields);
    },
    updateChats: async (id, message ) => {
      const chat = doc(db, 'chats', id);
      const updateFields = { 
        receiverHasRead: false,
        messages: FieldValue.arrayUnion({
          sender: message.sender,
          message: message.message,
          timeStamp: Date.now(),
        })
      };
      return await updateDoc(chat, updateFields);
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