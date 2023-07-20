import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import backgroundImage from "../../assets/bg.jpg";
import { useAuth } from "../../hooks/Auth/useAuth";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isAuthenticated = login(username, password);

    if (!isAuthenticated) {
      setLoginError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth={false} disableGutters component="main">
      <CssBaseline />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: "100vh",
          background: `url(${backgroundImage}) repeat`,
        }}
      >
        <div>
          <Grid textAlign="center">
            <Typography component="h1" variant="h5">
              Tesoro Admin
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {loginError && (
              <Typography color="error" variant="body1">
                {loginError}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Container>
  );
};

export default AuthPage;