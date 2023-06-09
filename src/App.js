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
import { UserAuth } from "./UserContext";

import Cookies from "js-cookie";

function App() {
  const { user } = UserAuth();

  const auth = getAuth(app);
  //const user = auth.currentUser;
  if (user !== null) {
    // L'utilisateur est connecté, vous pouvez récupérer ses données ici
    const uid = user.uid;
    const email = user.email;
    // etc...

    const [openEdit, setOpenEdit] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [editableObjct, setEditableObjct] = useState({});
    const editTodo = (obj) => {
      setOpenEdit(true);
      setEditValue(obj.name);
      setEditableObjct(obj);
    };

    const [showGrid, setShowGrid] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [gridLg, setGridLg] = useState(12);

    const [Todo, setTodo] = useState([]);

    const [sort, setSort] = useState("All");

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    let toDo = [];

    const sortTodos = (s) => {
      setSort(s);
    };

    const handleButtonClick = () => {
      setShowGrid(!showGrid);
      setGridLg(showGrid ? 12 : 8);
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 500);
    };

    const handleCalendarClick = () => {
      navigate("/Calendar");
    };

    if (sort === "All") toDo = Todo;
    else if (sort === "Doing") toDo = Todo.filter((todo) => !todo.completed);
    else if (sort === "Complete") toDo = Todo.filter((todo) => todo.completed);

    const deleteTodo = (id) => {
      setTodo(Todo.filter((todo) => todo.id !== id));
      db.deleteTodo(id);
    };

    const addTodo = (newTodoData) => {
      const id = Math.floor(Math.random() * 1000);
      const newTodo = { id, ...newTodoData };
      setTodo([...Todo, newTodo]);
      db.addTodos(newTodo, uid);
    };

    const completeTodo = (id) => {
      setTodo(
        Todo.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
      Todo.map((todo) => (todo.id === id ? db.completedTodo(id) : todo));
    };

    const setReminder = (id) => {
      setTodo(
        Todo.map((todo) =>
          todo.id === id ? { ...todo, reminder: !todo.reminder } : todo
        )
      );
      Todo.map((todo) => (todo.id === id ? db.reminderTodo(id) : todo));
    };

    //Style
    const useStyles = makeStyles((theme) => ({
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
    //Style

    return (
      <>
        <ResponsiveAppBar> </ResponsiveAppBar>

        <Container component="main" maxWidth="lg">
          <CssBaseline>
            <Paper className={classes.appPaper}>
              <Grid spacing={2} container>
                {showGrid && (
                  <Grid
                    lg={4}
                    sm={12}
                    xs={12}
                    item
                    className={showAnimation ? classes.fadeIn : ""}
                  >
                    <AddTaskForm addTodo={addTodo} />

                    <Typography
                      className={classes.noteTypo + " " + classes.hideCaption}
                      variant="caption"
                    >
                      Double Click On Todo To Toggle Reminder
                    </Typography>
                  </Grid>
                )}
                <Grid lg={gridLg} sm={12} xs={12} item>
                  <EditTodo
                    editableObjct={editableObjct}
                    Todo={Todo}
                    setTodo={setTodo}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                  />
                  <Tasks
                    editTodo={editTodo}
                    setReminder={setReminder}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                    sortTodos={sortTodos}
                    toDos={toDo}
                    sortString={sort}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick}
                    style={{ marginRight: "10px" }}
                  >
                    {" "}
                    Add Todo{" "}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCalendarClick}
                  >
                    {" "}
                    calendar{" "}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </CssBaseline>
        </Container>
      </>
    );
  } else {
    console.log("Echec auth");
    return <h1></h1>;
    // L'utilisateur n'est pas connecté, vous pouvez afficher un message de connexion ou rediriger vers la page de connexion
  }
}

export default App;
