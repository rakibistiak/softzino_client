import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import './MyOrder.css';
const MyOrder = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [deleteAcknowledged, setDeleteAcknowledged] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuth();
    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://young-inlet-90443.herokuapp.com/myOrder?email=${user?.email}`)
            .then(data => {
                setMyOrders(data.data);
                setIsLoading(false)
            })
    }, [user?.email, deleteAcknowledged]);
    //change the title when change the route
    useEffect(() => {
        document.title = 'My Order';
    }, []);
    //If user login is not finished
    if (isLoading) {
        return (
            <div className='text-center'>
                <Spinner style={{ paddingTop: '100px' }} animation="grow" variant="warning" />
            </div>
        )
    }
    const deleteOrder = (id, status) => {
        if (status === "Shipped" || status === "Delivered") {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: (`${status} Order Can't Canceled`),
            })
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    axios.delete(`https://young-inlet-90443.herokuapp.com/deleteOrder/${id}`)
                        .then(data => {
                            console.log(data);
                            if (data) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your Order has been Canceled.',
                                    'success'
                                )
                                setDeleteAcknowledged(true)
                            }
                        })
                )
            }
        })
    };
    return (
        <Container>
            <Row className='g-4' style={{ marginTop: '100px' }}>
                {
                    myOrders.map(order => {
                        const { _id, email, status, phone, address } = order || {};
                        const { name, price, modelYear, category } = order.carInfo || {};
                        return (
                            <Col key={_id} xs={12} md={6} lg={4}>
                                <div className='order-card'>
                                    <div className='d-flex justify-content-between'>
                                        <p className='order-email'>{email}</p>
                                        <p className={status === 'Pending' ? 'pending' : 'shipped'}>{status}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p className='order-price'>${price}</p>
                                        <address className='order-address'>{address}</address>
                                    </div>
                                    <div>
                                        <h5 className='car-name'>{name}</h5>
                                    </div>
                                    <hr style={{ color: '#fff' }} />
                                    <div className='d-flex justify-content-between'>
                                        <p className='model-year order-model-year'>{modelYear}</p>
                                        <p className='order-buttom'>{phone}</p>
                                        <p className='order-buttom'>{category}</p>
                                    </div>
                                    <div className="text-center">
                                        <button className='buy-button mt-3 py-2 px-4' onClick={() => deleteOrder(_id, status)}> Cancel Order</button>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        </Container>
    );
};

export default MyOrder;