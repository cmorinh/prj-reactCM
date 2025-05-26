import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
    const isAuthorized = localStorage.getItem('auth') === 'true';
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoutes;
