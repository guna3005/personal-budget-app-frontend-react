import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const FormContainer = styled.div`
  margin: auto;
  width: 300px;
  padding: 20px;
  text-align: center;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
`;

const LoginRegister = () => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert('Both username and password are required.');
            return;
        }
        
        const url = `http://localhost:3000/api/auth/${isLogin ? 'login' : 'register'}`;
        try {
            const response = await axios.post(url, { username, password });
            if (isLogin) {
                login(response.data.token);
                navigate('/dashboard');
            } else {
                alert('registration successful , you can login now');
            }
        } catch (error) {
            alert('Failed to authenticate: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <FormContainer>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit}>
                <StyledTextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <StyledTextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" color="primary" type="submit">
                    {isLogin ? 'Login' : 'Register'}
                </Button>
                <Button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need to register?' : 'Already have an account?'}
                </Button>
            </form>
        </FormContainer>
    );
};

export default LoginRegister;
