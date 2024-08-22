import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    useEffect(() => {
        api.get('/api/current_user/')
            .then(response => {
                setCurrentUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching current user", error);
                setLoading(false);
            });
    }, []);

    const login = async (email, password) => {
        // try {
        //     const response = await api.post('/api/login/', { email, password });
        //     // Assuming the response contains user data after successful login
        //     setCurrentUser(response.data);
        //     return response.data; // Useful for any additional handling outside
        // } catch (error) {
        //     console.error("Error during login", error);
        //     // You might want to handle specific error messages, like incorrect password
        //     throw error; // Re-throwing error for further handling if needed
        // }
    };

    const logout = async () => {
        try {
            await api.post('/api/logout/');
            setCurrentUser(null);
        } catch (error) {
            console.error("Error during logout", error);
            throw error; // Re-throwing error for further handling if needed
        }
    };


    const contextValue = {
        currentUser,
        setCurrentUser,
        login,
        logout,
        isLoggedIn: currentUser !== null,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
export default AuthContext;