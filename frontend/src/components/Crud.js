import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import AddPet from './AddPet';
import axios from 'axios';

import '../styles/crud.css';

const Crud = () => {
    const [pets, setPets] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
        getData()
    }, [updateList])

    //Read all records
    const getData = async () => {
        const response = await axios.get("http://localhost:8000/pets/");
            setPets(response.data);
    };

    //Delete a record
    const handleDelete = (petID) => {

        Swal.fire({
            title: 'Are you sure to delete this register?',
            text: 'This action cannot be reversed',
            icon: 'warning',
            confirmButtonText: 'Cool',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Remove'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/pet/${petID}`).then((response) => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Removed',
                            `Successfully Deleted`,
                            'success'
                        )
                        setUpdateList(!updateList)
                    } else {
                        Swal.fire(
                            'Error',
                            'There was a problem deleting the record',
                            'error'
                        )
                    }
                })
            }
        })
    }


    //Update a record
    const handleEdit = () => {
        console.log('Editado');
    }


    return (
        <div className='ppal-container'>
            <section className='pets-section'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Specie</th>
                        </tr>
                    </thead>
                    <tbody className='pets-register'>
                        {pets.map((pet) => {
                                return(
                                <tr key={pet._id}>
                                    <th>{pet.name}</th>
                                    <th>{pet.age}</th>
                                    <th>{pet.specie}</th>
                                    <th><Button variant="danger" onClick={() => handleDelete(pet._id)}>Delete</Button>{' '}</th>
                                    <th><Button variant="outline-primary" onClick={() => handleEdit(pet._id)}>Edit</Button>{' '}</th>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </section>
            <AddPet getData={getData} />
        </div>
    )
}

export default Crud;