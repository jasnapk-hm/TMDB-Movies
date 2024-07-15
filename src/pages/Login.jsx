import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, } from '@mui/material';
import { useEffect } from 'react';
import { addUser } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user);

  const handleLogin = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (emailPattern.test(email) && passwordPattern.test(password)) {
      const userId = `${email}${password}`
      localStorage.setItem('User_ID', userId);
      dispatch(addUser(userId))

      navigate('/home')
    } else {
      alert('Invalid email or password');
    }
  };

  useEffect(() => {
    if (userId) {
      navigate('/home', { replace: true });
    }
  }, [userId, navigate]
  );

  return (<>



    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "100px", padding: "20px"
    }}>

      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  </>
  );
};

export default Login;