import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import regImg from '../../img/login.jpg';
import useAuth from '../hooks/useAuth';
import './Registration.css'

const Registration = () => {
    const { setUser, setError, error, isLoading, setIsLoading, signInUsingGoogle, emailRegister, googleSaveUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [regData, setRegData] = useState({});

    // Collecte User Info
    const handleOnBlur = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newRegData = { ...regData };
        newRegData[field] = value;
        setRegData(newRegData);
    };

    //Where user want to go or send him to home page
    const redirect_uri = location.state?.from || '/dashboard';

    // Google Sign in
    const handleGoogleSignIn = () => {
        signInUsingGoogle()
            .then(result => {
                const user = result.user
                setUser(user);
                googleSaveUser(user.email, user.displayName)
                setError('');
                navigate(redirect_uri)
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    // Create user with Email and Password
    const handleRegister = (event) => {
        emailRegister(regData.email, regData.password, regData.displayName, navigate, redirect_uri)
        event.preventDefault();

    };

    //change the title when change the route
    useEffect(() => {
        document.title = 'Registration';
    }, []);

    //If user login is not finished
    // if (isLoading) {
    //     return (
    //         <div className='text-center'>
    //             <Spinner style={{ paddingTop: '100px' }} animation="grow" variant="warning" />
    //         </div>
    //     )
    // }
    return (
        <Container className='d-flex sign' style={{ marginTop: '120px' }}>
            <Row className='d-flex justify-content-center align-items-center w-75 mx-auto login-row'>
                <Col xs={12} md={6}>
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmailReg">
                                <Form.Label className='requried reg-email'>Email address</Form.Label>
                                <Form.Control name='email' onBlur={handleOnBlur} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name='displayName' onBlur={handleOnBlur} type="text" placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='requried'>Password</Form.Label>
                                <Form.Control name='password' onBlur={handleOnBlur} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button onClick={handleRegister} variant="info" type="submit" className='py-2 px-3 text-white'>
                                Sign up
                            </Button>
                            <p className='text-danger mt-4'> {error}</p>
                            <div className="d-flex mt-5 align-items-center">
                                <p className='login-with'>Or log in With</p>
                                <i onClick={handleGoogleSignIn} className="fab fa-google-plus-square mx-4 login google"></i>
                            </div>
                        </Form>
                    </div>
                </Col>


                <Col xs={12} md={6}>
                    <figure>
                        <img className='img-fluid reg-img' src={regImg} alt="Reg page" />
                    </figure>
                    <div className='mt-5 have-account'>
                        <Link to='/login'> Already have account?</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Registration;