import React, { useEffect } from 'react';
import Header from '../../Header/Header';

const Home = () => {
     //change the title when change the route
     useEffect(() => {
        document.title = 'Home';
    }, []);
    return (
        <div>
            <Header></Header>
            <h1>This is Home </h1>
        </div>
    );
};

export default Home;