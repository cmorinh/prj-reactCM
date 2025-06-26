import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        const savedIsAuthenticated = localStorage.getItem("isAuthenticated");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
            setIsAuthenticated(savedIsAuthenticated === "true");
        }
    }, []);

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const login = (email, password) => {
        if (isEmailValid(email) && isPasswordValid(password)) {
          const token = btoa(email + ":" + password);

          setToken(token);
          setUser(email);
          setIsAuthenticated(true);

          localStorage.setItem("token", token);
          localStorage.setItem("user", email);
          localStorage.setItem("isAuthenticated", true);

          return true;
        }

        return false;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);