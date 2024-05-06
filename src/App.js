import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginRegister from './components/auth/LoginRegister';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';

const PrivateRoute = ({ children }) => {
    const { authToken } = useAuth();
    return authToken ? children : <Navigate to="/" replace />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    {/* Catch all other routes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
