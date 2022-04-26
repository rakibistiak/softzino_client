import React from 'react';
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap'
import './NotFound.css'
const NotFound = () => {
    const navigate = useNavigate();

    // Move to home page from not found
    const goHomePage = () => {
        navigate('/home')
    }
    return (
        <div className='not-found'>
            <h1> 404 </h1>
            <h2> Page not found </h2>
            <p>SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN REMOVED. NAME CHANGED OR IS TEMPORARILY UNAVAILABLE</p>
            <Button className='regular-button' onClick={goHomePage}> Go to Home </Button>
        </div>
    );
};

export default NotFound;