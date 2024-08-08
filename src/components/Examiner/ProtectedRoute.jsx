// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, redirectTo = "/", ...rest }) => {
    const token = localStorage.getItem("examinerToken");
    return token ? element : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
