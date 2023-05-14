import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "./firebase.config";
import { NavLink, useNavigate } from "react-router-dom";
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
import * as Yup from "yup";
//import { aU } from "@fullcalendar/core/internal-common";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © AWS - Groupe6 "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textFieldIsEmpty: {
    "& label.Mui-focused": {
      color: "red",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiInputLabel-root": {
      color: "red",
    },
    "& .MuiOutlinedInput-input": {
      color: "red",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textFieldIsEmpty, setTextFieldIsEmpty] = useState(false);
  const [textFieldIsEmptyMDP, setTextFieldIsEmptyMDP] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("L'adresse e-mail doit être valide")
      .required("L'adresse e-mail est requise"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Le mot de passe est requis"),
  });

  const onLogin = (e) => {
    e.preventDefault();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        //const user = userCredential.user;
        signInWithEmailAndPassword(auth, email, password)
        . then ( ( userCredential )  =>  {
          // Connecté
          const  user  =  userCredential.user ;
          navigate("/App")
        } )
        . catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        }) ;
          //navigate("/App");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Utilisateur n'existe pas ou Mot de passe incorrect ! ");
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              className={textFieldIsEmpty ? classes.textFieldIsEmpty : ""}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
                setTextFieldIsEmpty(e.target.value.trim() === "");
              }}
            />
            <TextField
              className={textFieldIsEmptyMDP ? classes.textFieldIsEmpty : ""}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setTextFieldIsEmptyMDP(e.target.value.trim() === "");
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/PasswordReset" variant="body2">
                  Forgot password ?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/Signup">Don't have an account? Sign up</NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Login;
