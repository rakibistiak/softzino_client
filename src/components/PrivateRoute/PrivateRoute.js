import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, isLoading } = useAuth();

    //If user login is not finished

    if (isLoading) {
        return (
            <div className='text-center'>
                <Spinner style={{ paddingTop: '100px' }} animation="grow" variant="warning" />
            </div>
        );
    };
    return(
        (user?.email || user?.displayName) ?
        children :
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default PrivateRoute;