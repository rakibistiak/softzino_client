import React, { useEffect } from 'react';
import { Col, Container, Form, Row, Button, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {  useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImg from '../../img/login.jpg'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AiTwotoneMail } from 'react-icons/ai';
const Login = () => {
    const { signInUsingGoogle, loginWithEmail, setUser, error, setError, isLoading, setIsLoading, googleSaveUser } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    //where user wanted to go or send user to homepage
    const redirect_uri = location.state?.from || '/dashboard';
    //Google Sign in
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
    //change the title when change the route
    useEffect(() => {
        document.title = 'Login';
    }, []);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        loginWithEmail(data.email, data.password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setError('');
                navigate(redirect_uri);
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => setIsLoading(false))
        reset();
    };
    //If user login is not finished
    // if (isLoading) {
    //     return (
    //         <div className='text-center'>
    //             <Spinner style={{ paddingTop: '100px' }} animation="grow" variant="warning" />
    //         </div>
    //     )
    // }
    return (

        <Container style={{ marginTop: '120px' }}>
            <Row className='g-4 d-flex justify-content-center align-items-center w-75 mx-auto login-row p-3'>
                <h3 className="text-center">Please Log in</h3>

                <Col xs={12} md={6}>
                    <figure>
                        <img className='img-fluid login-img' src={loginImg} alt="" />
                    </figure>
                    <div className='mt-5 signup-text'>
                        <Link to='/registration'>New here? Please Sign up </Link>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>


                            <Form.Group className="mb-3" controlId="formBasicEmailLogin">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control {...register("email")} required type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control {...register("password")} required type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="info" type="submit" className='py-2 px-3 text-white'>
                                Login
                            </Button>
                            {errors.exampleRequired && <span>This field is required</span>}
                            <p className='text-danger mt-4'> {error}</p>
                        </form>
                        <div className="d-flex mt-5 align-items-center">
                            <p className='login-with'>Or log in With</p>
                            <AiTwotoneMail onClick={handleGoogleSignIn} className="mx-4 login google" />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>


    );
};

export default Login;