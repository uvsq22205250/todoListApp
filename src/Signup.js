import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase.config';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Yup from 'yup';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © AWS - Groupe6'}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textFieldIsEmpty: {
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
    '& .MuiInputLabel-root': {
      color: 'red',
    },
    '& .MuiOutlinedInput-input': {
      color: 'red',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'red',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
    }
  },
}));
 
const Signup = () => {
    const classes = useStyles();
    const navigate = useNavigate();
 
    const [Lname, setLname] = useState('')
    const [Fname, setFname] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [textNameFieldIsEmpty, setTextNameFieldIsEmpty] = useState(false);
    const [textFNameFieldIsEmpty, setTextFNameFieldIsEmpty] = useState(false);
    const [textMailFieldIsEmpty, setTextMailFieldIsEmpty] = useState(false);
    const [textFieldIsEmptyMDP, setTextFieldIsEmptyMDP] = useState(false);
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            navigate("/Login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={textFNameFieldIsEmpty ? classes.textFieldIsEmpty : ''}
                autoComplete="fname"
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e)=>{
                  setFname(e.target.value) 
                  setTextFNameFieldIsEmpty(e.target.value.trim() === '');
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              className={textNameFieldIsEmpty ? classes.textFieldIsEmpty : ''}
                variant="filled"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=>{
                  setLname(e.target.value) 
                  setTextNameFieldIsEmpty(e.target.value.trim() === '');
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              className={textMailFieldIsEmpty ? classes.textFieldIsEmpty : ''}
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {setEmail(e.target.value)
                  setTextMailFieldIsEmpty(e.target.value.trim() === '');
                }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
              className={textFieldIsEmptyMDP ? classes.textFieldIsEmpty : ''}
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {setPassword(e.target.value)
                  setTextFieldIsEmptyMDP(e.target.value.trim() === '');
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive notifications via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
             
                
                <NavLink to="/Login" >
                Already have an account? Sign in
                </NavLink>
              
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
 
export default Signup