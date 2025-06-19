import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoutes({ children }) {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoutes;
