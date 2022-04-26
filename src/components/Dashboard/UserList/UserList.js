import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('https://salty-scrubland-60190.herokuapp.com/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, []);
    return (
        <>
            <Container style={{ marginTop: '100px' }}>
                <h4 className="text-center">Total User : {users.length}</h4>
                {
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>SL.</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        {
                            users.map((user, index) => {
                                return (
                                    <tbody key={user?._id} style={{ fontWeight: '500' }}>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{user?._id}</td>
                                            <td>{user?.displayName}</td>
                                            <td>{user?.email}</td>
                                        </tr>
                                    </tbody>
                                );
                            })
                        }
                    </Table>
                }
            </Container>
        </>
    );
};

export default UserList;