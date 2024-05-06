import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';  // Adjust path as needed
import LoginRegister from '../../components/auth/LoginRegister';

describe('LoginRegister Component', () => {
  test('toggle between Login and Register view', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginRegister />
        </AuthProvider>
      </BrowserRouter>
    );

    // Initially should show 'Login'
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Toggle to 'Register'
    fireEvent.click(screen.getByText(/need to register\?/i));
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

    // Toggle back to 'Login'
    fireEvent.click(screen.getByText(/already have an account\?/i));
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
