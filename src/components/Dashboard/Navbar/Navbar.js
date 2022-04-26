import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as RiIcons from 'react-icons/ri';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const {user, logOut} = useAuth()

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar fixed-top'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className='d-flex user-info'>
                        <p className='me-3 text-white logged-user-name'>{user.displayName}</p>
                        <figure>
                            <img className='user-img me-5' src={user.photoURL} alt='userImage' />
                        </figure>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        <li className='nav-text'>
                            <Link to='/home'>
                                <AiIcons.AiFillHome />
                                <span>Home</span>
                            </Link>
                        </li>

                        {
                            <div>
                            <li className='nav-text'>
                                <Link to={`/dashboard/deleteproduct`}>
                                    <RiIcons.RiDeleteBin5Fill />
                                    <span>Delete Product</span>
                                </Link>
                            </li>

                            <li className='nav-text'>
                                <Link to={`/dashboard/addProduct`}>
                                    <RiIcons.RiFileAddFill />
                                    <span>Add Product</span>
                                </Link>
                            </li>

                            <li className='nav-text'>
                                <Link to={`/dashboard/users`}>
                                    <FaIcons.FaUserCog />
                                    <span>User Lists</span>
                                </Link>
                            </li>

                        </div>
                        }


                        <li className='nav-text' onClick={logOut}>
                            <Link to='/home'>
                                <FiIcons.FiLogOut />
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
            <Outlet></Outlet>
        </div>
    );
};

export default Navbar;