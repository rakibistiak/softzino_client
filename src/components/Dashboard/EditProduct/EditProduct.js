import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
const EditProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/dashboard/findProduct/${id}`)
            .then(res => res.json())
            .then(data => setSingleProduct(data))
    }, [id])
    // send data to store on DB
    const onSubmit = data => {
        console.log(data)
        if(!data.name){
            data.name = singleProduct?.name
        }
        if(!data.img){
            data.img = singleProduct?.img
        }
        if(!data.price){
            data.price = singleProduct?.price
        }
        if(!data.instractor){
            data.instractor = singleProduct?.instractor
        }
        axios.put(`http://localhost:5000/dashboard/editProduct/${id}`, data)
            .then(data => {
                if (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your Product has been Edited',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset();
                }
            })
    };
    //change the title when change the route
    useEffect(() => {
        document.title = 'Edit a Product(Admin)';
    }, []);
    return (
        <Container style={{ marginTop: '120px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Form.Group as={Col} xs={12} lg={6} className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register("name")} type="text" placeholder={singleProduct?.name} />
                    </Form.Group>

                    <Form.Group as={Col} xs={12} lg={6} className="mb-3" controlId="formBasicImage">
                        <Form.Label>Image URl</Form.Label>
                        <Form.Control {...register("img")} type="text" placeholder={singleProduct?.img} />
                        <Form.Text className="text-muted">
                            Preferred Image size is 400*200
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control {...register("price")} type="number" placeholder={singleProduct?.price} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicName">
                        <Form.Label>Instractor name</Form.Label>
                        <Form.Control {...register("instractor")} type="text" placeholder={singleProduct?.instractor} />
                    </Form.Group>
                </Row>
                <Button className='regular-button py-2 px-3 text-white' type="submit">
                    Submit
                </Button>
                {errors.exampleRequired && <span>This field is required</span>}

            </form>

        </Container>
    );
};

export default EditProduct;