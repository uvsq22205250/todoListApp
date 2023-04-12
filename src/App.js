import { Container, CssBaseline, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import AddTaskForm from "./Components/AddTaskForm";
import EditTodo from "./Components/EditTodo";
import Tasks from "./Components/Tasks";
import CreateNewTodo from "./Components/CreateNewTodo";
import ResponsiveAppBar from "./Components/ResponsiveAppBar.jsx";
import Button from '@material-ui/core/Button';


import SideBar from './Components/SideBar'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';





function App() {
 
  const [openEdit, setOpenEdit] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [editableObjct, setEditableObjct] = useState({})
  const editTodo = (obj) => {
      setOpenEdit(true)
      setEditValue(obj.name)
      setEditableObjct(obj)
  }

  const [showGrid, setShowGrid] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [gridLg, setGridLg] = useState(12);

  const [Todo, setTodo] = useState([])

  const [sort, setSort] = useState('All')

  let toDo = []

  const sortTodos = (s) => {
    setSort(s)
  }

  const handleButtonClick = () => {
    setShowGrid(!showGrid);
    setGridLg(showGrid ? 12 : 8); 
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 500);
  };

  
  
  if(sort === 'All') toDo = Todo;
  else if (sort === 'Doing') toDo = Todo.filter(todo => !todo.completed);
  else if(sort === 'Complete') toDo = Todo.filter(todo => todo.completed);

  const deleteTodo = (id) => {
    setTodo(Todo.filter((todo) => todo.id!==id))
  }
  const addTodo = (newTodoData) => {
    const id = Math.floor(Math.random() * 1000)
    const newTodo = {id, ...newTodoData}
    setTodo([...Todo, newTodo])
  }
  const completeTodo = (id) => {
    setTodo(Todo.map(todo => todo.id===id ? {...todo, completed: true} : todo))
  }

  const setReminder = (id) => {
    setTodo(Todo.map(todo => todo.id===id ? {...todo, reminder: !todo.reminder} : todo))
  }



  //Style
  const useStyles = makeStyles((theme) => ({
    appPaper: {
      padding: theme.spacing(1, 3),
      margin: theme.spacing(6, 0),
      [theme.breakpoints.down('xs')]: {padding: theme.spacing(1, 1)}
    },
    noteTypo: {
      opacity: .7,
      fontWeight: 500,
      marginLeft: theme.spacing(2)
    },
    hideCaption: {
      [theme.breakpoints.down('sm')]: {display: 'none'}
    },
    fadeIn: {
      animation: '$fadeIn 0.5s ease-in-out',
    },
    fadeOut: {
      animation: '$fadeOut 0.5s ease-in-out',
    },
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    '@keyframes fadeOut': {
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
    <ResponsiveAppBar></ResponsiveAppBar>

      
      <Container component="main" maxWidth="lg">
      
        <CssBaseline>
          <Paper className={classes.appPaper} >
            <Grid  spacing={2} container>
              {showGrid && (
                <Grid lg={4} sm={12} xs={12} item  className={ showAnimation ? classes.fadeIn: ""} >
                
                <AddTaskForm addTodo={addTodo} />
               
                <Typography className={classes.noteTypo + ' ' + classes.hideCaption} variant="caption" >Double Click On Todo To Toggle Reminder</Typography>
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
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          tools
        </Button>
      </Grid>
            </Grid>
          </Paper>
        </CssBaseline>
      </Container>
      
    </>
  );
}

export default App;
