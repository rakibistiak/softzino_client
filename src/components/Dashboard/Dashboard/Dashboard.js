import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
     //change the title when change the route
     useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    return (
        <div>
            <Navbar></Navbar>
        </div>
    );
};

export default Dashboard;