import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Home from '../../Home/Home/Home'
import MyOrder from '../MyOrder/MyOrder';
import ManageAllOrder from '../ManageAllOrder/ManageAllOrder';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
// import AdminRoute from '../../AdminRoute/AdminRoute';
import AddAProduct from '../AddAProduct/AddAProduct';
import AddReview from '../AddReview/AddReview';
import Payment from '../Payment/Payment';
import ManageProducts from '../ManageProducts/ManageProducts';
import useAuth from '../../hooks/useAuth';
function Navbar() {
    const { user, logOut } = useAuth();
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    let { path, url } = useRouteMatch();

    return (
        <>
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

                        {/* {!admin && <div>
                            <li className='nav-text'>
                                <Link to={`${url}/myorder`}>
                                    <AiIcons.AiOutlineShoppingCart />
                                    <span>My Orders</span>
                                </Link>
                            </li>

                            <li className='nav-text'>
                                <Link to={`${url}/payment`}>
                                    <MdIcons.MdPayment />
                                    <span>Payment</span>
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <Link to={`${url}/addReview`}>
                                    <MdIcons.MdRateReview />
                                    <span>Add Review</span>
                                </Link>
                            </li>

                        </div>
                        } */}

                        {/* {
                            admin && <div>
                                <li className='nav-text'>
                                    <Link to={`${url}/allOrders`}>
                                        <MdIcons.MdManageAccounts />
                                        <span>Manage All Order</span>
                                    </Link>
                                </li>

                                <li className='nav-text'>
                                    <Link to={`${url}/makeadmin`}>
                                        <RiIcons.RiAdminFill />
                                        <span>Make Admin</span>
                                    </Link>
                                </li>

                                <li className='nav-text'>
                                    <Link to={`${url}/addProduct`}>
                                        <AiIcons.AiFillCar />
                                        <span>Add a New Product</span>
                                    </Link>
                                </li>

                                <li className='nav-text'>
                                    <Link to={`${url}/manageProduct`}>
                                        <AiIcons.AiFillEdit />
                                        <span>Edit Product</span>
                                    </Link>
                                </li>
                            </div>
                        } */}


                        <li className='nav-text' onClick={logOut}>
                            <Link to='/home'>
                                <FiIcons.FiLogOut />
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                {/* <Route exact path={path}>
                    {!admin ?
                        <MyOrder></MyOrder>
                        :
                        <ManageAllOrder />
                    }
                </Route> */}
                <Route exact path={`${path}/myorder`}>
                    <MyOrder></MyOrder>
                </Route>
                <Route exact path={`${path}/payment`}>
                    <Payment></Payment>
                </Route>
                {/* <AdminRoute exact path={`${path}/allOrders`}>
                    <ManageAllOrder></ManageAllOrder>
                </AdminRoute>
                <AdminRoute exact path={`${path}/makeadmin`}>
                    <MakeAdmin></MakeAdmin>
                </AdminRoute>
                <AdminRoute exact path={`${path}/addProduct`}>
                    <AddAProduct></AddAProduct>
                </AdminRoute>
                <AdminRoute exact path={`${path}/manageProduct`}>
                    <ManageProducts></ManageProducts>
                </AdminRoute> */}
                <Route exact path={`${path}/addReview`}>
                    <AddReview></AddReview>
                </Route>
            </Switch>
        </>
    );
}

export default Navbar;