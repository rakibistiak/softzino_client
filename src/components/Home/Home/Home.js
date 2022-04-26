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
            <h3 className='mt-5 pt-5 text-center'>Only Admin Dashboard available Will Update UI near future. stay tuned </h3>
        </div>
    );
};

export default Home;