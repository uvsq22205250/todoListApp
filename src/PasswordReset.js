import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "./firebase.config";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

function PasswordReset() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [textMailFieldIsEmpty, setTextMailFieldIsEmpty] = useState(false);
  const auth = getAuth(app);
  const handleSubmit = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Email de réinitialisation envoyé avec succès!");
        alert("Password reset email sent");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'envoi de l'email de réinitialisation:",
          error
        );
        alert("Password reset email no sent");
      });
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    setTextMailFieldIsEmpty(event.target.value.trim() === "");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Entrez votre adresse e-mail
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            className={textMailFieldIsEmpty ? classes.textFieldIsEmpty : ""}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Envoyer
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/Login" variant="body2">
                {"Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default PasswordReset;
