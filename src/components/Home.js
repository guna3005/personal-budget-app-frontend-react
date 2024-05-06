import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import Button from '@mui/material/Button';

// Styled components
const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #666;
`;

const ButtonsContainer = styled.div`
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
`;

const Home = () => {
    const { authToken } = useAuth();
    const navigate = useNavigate();

    return (
        <Container>
            <Title>Welcome to the Personal Budget App</Title>
            <Description>This application helps you manage your budgets efficiently and visualize your spending habits.</Description>
            {authToken ? (
                <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                </Button>
            ) : (
                <ButtonsContainer>
                    <Button variant="contained" color="primary" component={StyledLink} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={StyledLink} to="/login">
                        Register
                    </Button>
                </ButtonsContainer>
            )}
        </Container>
    );
};

export default Home;
