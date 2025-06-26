import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';
import { useEffect, useState } from 'react';

function ProtectedRoutes({ children }) {
    const {isAuthenticated} = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {isLoading ? <Loading /> : isAuthenticated ? children : <Navigate to="/login" />}
        </>
    )
}

export default ProtectedRoutes;
