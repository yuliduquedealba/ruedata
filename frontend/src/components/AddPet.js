import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import '../styles/addpet.css'
// import { AddPet } from './Functions'

export default function AddPet({ getData }) {
  // const [state, setState] = useState(0);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [specie, setSpecie] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const payload = {
    name: name,
    age: age,
    specie: specie
  }

  const submit = () => {
    axios.post("http://localhost:8000/", payload)
  }

  const eventsSaveBtn = () => {
    submit()
    getData()
    handleClose()
  }
 

  return (
    <>
      <Button className='addPet-button' variant="primary" size="sm" onClick={handleShow}>
        Add Pet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pet Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Age</Form.Label>
              <Form.Control
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="Enter Age"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Specie</Form.Label>
              <Form.Control
                onChange={(e) => setSpecie(e.target.value)}
                type="text"
                placeholder="Enter Specie"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={eventsSaveBtn}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}