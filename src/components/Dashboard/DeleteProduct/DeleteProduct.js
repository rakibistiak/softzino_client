import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './DeleteProduct.css'

const DeleteProduct = () => {
    const [products, setProducts] = useState([]);
    const [deleteAcknowledged, setDeleteAcknowledged] = useState(false);
    // use this state to determain data is lodded or not
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    //change the title when change the route
    useEffect(() => {
        document.title = 'Manage Product (Admin)';
    }, []);
    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
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
                    axios.delete(`http://localhost:5000/deleteproduct/${id}`)
                        .then(data => {
                            if (data) {
                                Swal.fire(
                                    'Deleted!',
                                    'Product Data has been deleted',
                                    'success'
                                )
                                setDeleteAcknowledged(!deleteAcknowledged)
                            }
                        })
                )
            }
        })
    };

    const handleEdit = (id) =>{
        navigate(`/dashboard/findProduct/${id}`)
    }
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
                    products.map(product => {
                        const { _id, name, img, price, instractor} = product || {};
                        return (
                            <Col key={_id} xs={12} md={6} lg={4}>
                                <div className='product-card'>
                                    <figure>
                                        <img className='img-fluid' src={img} alt="" />
                                    </figure>
                                    <div className="product-text">
                                        <h5>{name}</h5>
                                        <h6>Starting at ${price}</h6>
                                        <hr style={{ width: '80%', margin: '0px auto' }} />
                                        <div className="d-flex mt-3">
                                            <h6 className='me-3'>{instractor}</h6>
                                            <button className="button me-3" onClick={() => handleDelete(_id)}>Delete</button>
                                            <button className="button" onClick={() => handleEdit(_id)}>Edit</button>
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

export default DeleteProduct;