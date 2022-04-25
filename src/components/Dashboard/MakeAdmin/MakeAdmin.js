import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Form } from 'react-bootstrap'
import './MakeAdmin.css'
const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const collectEmail = (event) => {
        setEmail(event.target.value)
    };
    const handleMakeAdmin = (event) => {
        const adminEmail = { email: email };
        axios.put('https://young-inlet-90443.herokuapp.com/user/admin', adminEmail)
            .then(data => {
                if (!data.data.matchedCount) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This User is not exist in out DB',
                      })
                }
                else if (data.data.modifiedCount === 0 && data.data.matchedCount === 1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This User Already in Admin Role',
                      })
                }
                else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Make Admin successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            });
        event.preventDefault();
    };

    //change the title when change the route
    useEffect(() => {
        document.title = 'Make Admin(Admin)';
    }, []);
    return (
        <Form className='form-container mx-auto'>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="mb-3">Email address</Form.Label>
                <Form.Control className='form-email' onChange={collectEmail} type="email" placeholder="admin@support.com" />
            </Form.Group>
            <Button onClick={handleMakeAdmin} className='regular-button' type="submit">
                Make Admin
            </Button>
        </Form>
    );
};

export default MakeAdmin;