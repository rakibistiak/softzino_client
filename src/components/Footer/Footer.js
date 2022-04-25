import React from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import logo from '../../img/logo.png'
import './Footer.css';
const Footer = () => {
    return (
        <footer className='footer'>
            <hr />
            <Container>
                <Row className='g-4'>
                    <Col sm={6} md={5} lg={5} xl={3}>
                        <div>
                            <Link to='/home' style={{ textDecoration: 'none' }}> <img src={logo} className='logo' alt="" /> </Link>
                            <p style={{ margin: '30px 0px', color: '#AEB0B4' }}>Thousand of Cars avaiable here. make your own one. Best car best value here</p>
                            <div className='d-flex'>
                                <Link className='social-link' to='https://www.facebook.com/aronno.avro/'> <i className="fab fa-facebook"></i> </Link>
                                <Link className='social-link' to='https://www.linkedin.com/in/md-rakib-istiak-82243b1ba/'> <i className="fab fa-linkedin-in"></i> </Link>
                                <Link className='social-link' to='https://github.com/rakibemon'> <i className="fab fa-github"></i> </Link>
                            </div>
                        </div>
                    </Col>

                    <Col sm={6} md={5} lg={5} xl={3}>
                        <div>
                            <h4> Contact </h4>
                            <ul className='list-unstyled' style={{ color: '#AEB0B4' }}>
                                <li><i className="fas fa-map-marker-alt lh-lg me-2  fs-5"></i>House#21, Azimpur, Dhaka</li>
                                <li><i className="fas fa-envelope me-3 lh-lg fs-5"></i>rakibemon03@gmail.com</li>
                                <li> <i className="fas fa-phone-alt me-3 lh-lg fs-5"></i>01787137844</li>
                            </ul>
                        </div>
                    </Col>

                    <Col sm={6} md={5} lg={5} xl={3}>
                        <div>
                            <h4> Links </h4>
                            <ul className='list-unstyled'>
                                <NavHashLink className='link lh-lg' to='/home#hero'> <li> Home </li> </NavHashLink>
                                <NavHashLink className='link lh-lg' to='/home#cars'> <li> Cars </li> </NavHashLink>
                                <NavHashLink className='link lh-lg' to='/home#review'> <li> Review</li> </NavHashLink>
                                <NavHashLink className='link lh-lg' to='/home#chooseus'> <li> Why Us </li> </NavHashLink>
                            </ul>
                        </div>
                    </Col>

                    <Col sm={6} md={5} lg={5} xl={3}>
                        <div>
                            <h4 style={{ fontWeight: '500' }}> Newsletter</h4>
                            <p style={{ color: '#00000080' }}>Subscribe our newsletter to get updates.</p>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                            </Form>
                            <br /> <br />
                            <button className='button'>Subscribe</button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <p className="text-center mt-4"> Copyright &copy; 2021 All rights reserved | This Vehica website is made with <b style={{ color: '#F15D30' }}>React Node Express MongoDB</b> by <b style={{ color: '#F15D30' }}>Emon</b></p>
                </Row>
            </Container>

        </footer>
    );
};

export default Footer;