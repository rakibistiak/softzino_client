import React, { useEffect } from 'react';

const Payment = () => {
    //change the title when change the route
    useEffect(() => {
        document.title = 'Payment';
    }, []);
    return (
        <div style={{marginTop:'100px'}}>
            <h3 className="text-center mt-4"> Payment System Comming soon.</h3>
            <h6 className="text-center">Thanks for you patients</h6>
        </div>
    );
};

export default Payment;