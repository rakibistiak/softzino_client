import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

const ManageProducts = () => {
    const [cars, setCars] = useState([]);
    const [deleteAcknowledged, setDeleteAcknowledged] = useState(false);
    // use this state to determain data is lodded or not
    const [isLoading, setIsLoading] = useState(true);
    //change the title when change the route
    useEffect(() => {
        document.title = 'Manage Product (Admin)';
    }, []);
    useEffect(() => {
        setIsLoading(true)
        fetch('https://young-inlet-90443.herokuapp.com/explorecars')
            .then(res => res.json())
            .then(data => {
                setCars(data);
                setIsLoading(false)
            })
    }, [deleteAcknowledged]);
    const handleDelete = (id) => {
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
                    axios.delete(`https://young-inlet-90443.herokuapp.com/manageProduct/${id}`)
                        .then(data => {
                            if (data) {
                                Swal.fire(
                                    'Deleted!',
                                    'Car Data has been deleted',
                                    'success'
                                )
                                setDeleteAcknowledged(!deleteAcknowledged)
                            }
                        })
                )
            }
        })
    };
    // Show spinner when data is not lodded
    if (isLoading) {
        return (
            <div className='text-center'>
                <Spinner style={{ marginTop: '120px' }} animation="grow" variant="warning" />
            </div>
        );
    };
    return (
        <Container>
            <Row className='g-4' style={{marginTop:'100px'}}>
                {
                    cars.map(car => {
                        const { _id, name, description, img, price, modelYear, category } = car || {};
                        return (
                            <Col key={_id} xs={12} md={6} lg={4}>
                                <div className='car-card'>
                                    <figure>
                                        <img className='img-fluid' src={img} alt="" />
                                    </figure>
                                    <div className="car-text">
                                        <h5>{name}</h5>
                                        <p className='car-desc'>{description.slice(0, 80)}</p>
                                        <h6>Starting at ${price}</h6>
                                        <hr style={{ width: '80%', margin: '0px auto' }} />
                                        <div className="d-flex mt-3">
                                            <p className="model-year">{modelYear}</p>
                                            <p className="mx-4 category">{category}</p>
                                            <button className="buy-button" onClick={() => handleDelete(_id)}>Delete</button>
                                        </div>
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
export default ManageProducts;