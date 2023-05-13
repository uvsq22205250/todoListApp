import {
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AddTaskForm from "./Components/AddTaskForm";
import EditTodo from "./Components/EditTodo";
import Tasks from "./Components/Tasks";
import ResponsiveAppBar from "./Components/ResponsiveAppBar.jsx";
import Button from "@material-ui/core/Button";
import db from "./configCRUD";
import { onSnapshot } from "firebase/firestore";
import app from "./firebase.config";
import { getAuth } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import Calendar from "./Components/Calendar";
import { UserAuth } from "./UserContext";

function CalendarPage() {
  const { user } = UserAuth();
  const auth = getAuth(app);

  if (user !== null) {
    const uid = user.uid;
    const email = user.email;
    const [toDos, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const loadTodos = () =>
        onSnapshot(db.todos(), (query) => {
          const list = [];
          query.forEach((doc) => {
            const tache = doc.data();
            const id = doc.id;
            const newTodo = { id, ...tache };
            if (newTodo.userId == uid) {
              list.push(newTodo);
            }
          });
          setTodo(list);
          setLoading(false);
        });
      loadTodos();
    }, []);
    console.log(toDos);

    //Style
    const useStyles = makeStyles((theme) => ({
      container:{
        maxWidth: '900px',
        margin: '50px auto',
      },
      appPaper: {
        padding: theme.spacing(1, 3),
        margin: theme.spacing(6, 0),
        [theme.breakpoints.down("xs")]: { padding: theme.spacing(1, 1) },
      },
      noteTypo: {
        opacity: 0.7,
        fontWeight: 500,
        marginLeft: theme.spacing(2),
      },
      hideCaption: {
        [theme.breakpoints.down("sm")]: { display: "none" },
      },
      fadeIn: {
        animation: "$fadeIn 0.5s ease-in-out",
      },
      fadeOut: {
        animation: "$fadeOut 0.5s ease-in-out",
      },
      "@keyframes fadeIn": {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      "@keyframes fadeOut": {
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      },
    }));
    const classes = useStyles();

    return (
      <>
        <ResponsiveAppBar> </ResponsiveAppBar>
        <div className= {classes.container}>
          <Calendar Todo={toDos} />
        </div>

      </>
    );
  } else {
    console.log("Echec auth");
    return <h1></h1>;
    // L'utilisateur n'est pas connecté, vous pouvez afficher un message de connexion ou rediriger vers la page de connexion
  }
}

export default CalendarPage;
