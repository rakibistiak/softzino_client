import axios from 'axios';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useForm } from "react-hook-form";
const AddAProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // send data to store on DB
    const onSubmit = data => {
        axios.post('https://young-inlet-90443.herokuapp.com/addProduct', data)
            .then(data => {
                if (data.data.acknowledged) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your Review has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    reset();
                }
            })
    };
    //change the title when change the route
    useEffect(() => {
        document.title = 'Add a Product(Admin)';
    }, []);
    return (
        <Container style={{ marginTop: '120px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Form.Group as={Col} xs={12} lg={6} className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register("name")} required type="text" placeholder="Enter Car Name" />
                    </Form.Group>

                    <Form.Group as={Col} xs={12} lg={6} className="mb-3" controlId="formBasicImage">
                        <Form.Label>Image URl</Form.Label>
                        <Form.Control {...register("img")} required type="text" placeholder="Image url" />
                        <Form.Text className="text-muted">
                            Preferred Image size is 400*200
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control {...register("price")} required type="number" placeholder="Price" />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicName">
                        <Form.Label>Model Year</Form.Label>
                        <Form.Control {...register("modelYear")} required type="number" placeholder="Ex: 2017/2021/2022" />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicCategory">
                        <Form.Label>Car Category</Form.Label>
                        <Form.Select {...register("category")}>
                            <option>Auto</option>
                            <option>Manual</option>
                        </Form.Select>

                    </Form.Group>
                </Row>
                <FloatingLabel className="mb-3" controlId="floatingTextarea" label="Car Description">
                    <Form.Control {...register("description")}
                        as="textarea"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <Button className='regular-button py-2 px-3 text-white' type="submit">
                    Submit
                </Button>
                {errors.exampleRequired && <span>This field is required</span>}

            </form>

        </Container>
    );
};

export default AddAProduct;