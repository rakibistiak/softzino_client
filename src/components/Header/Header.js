import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import useAuth from '../hooks/useAuth';
import './Header.css';
const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <div>
            <Navbar collapseOnSelect style={{ backgroundColor: 'rgba(0,0, 0, 1)' }} expand="md" fixed='top' >
                <Container className='p-0'>
                    <Navbar.Brand> <NavHashLink to="/home" style={{ textDecoration: 'none' }}>Logo</NavHashLink></Navbar.Brand>
                    <Navbar.Toggle className='nav-toggle' style={{ backgroundColor: '#fff', width: '16%' }} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse style={{ backgroundColor: 'rgba(0,0, 0, 1)' }} id="basic-navbar-nav">


                        <Nav className="ms-auto d-flex justify-content-start align-items-center">
                            <NavHashLink  className="nav-link" to='/home'> Home</NavHashLink>
                            <NavLink className="nav-link mt-1" to='/dashboard'> Dashboard</NavLink>


                            {/* When User logged in "Logout button" when not Login & SignUp button */}
                            {user.displayName || user.email ?

                                <div className='d-md-flex'>
                                    <button className='button' onClick={logOut}> Log out</button>
                                </div>
                                :
                                <NavLink className="link log-in-button" to='/login'> <button className='button'>Log in</button></NavLink>
                            }
                        </Nav>



                        {/* display logged user info */}
                        <Nav className="ms-auto">
                            {
                                (user.displayName || user.email) &&
                                <div className='d-flex user-info'>
                                    <p className='me-3 text-white logged-user-name'>{user.displayName}</p>
                                    <figure>
                                        <img className='user-img' src={user.photoURL} alt='userImage' />
                                    </figure>
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;