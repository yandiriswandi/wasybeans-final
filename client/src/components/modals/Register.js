import React, { useState } from "react";

//react bootstrap
import { Modal, Form } from "react-bootstrap";

//import Sweetalert2
import Swal from "sweetalert2";
//react router dom
import { useNavigate } from "react-router-dom";
//use mutation
import { useMutation } from "react-query";

//config API
import { API } from "../../config/api";
import { Alert } from 'react-bootstrap';
// import { UserContext } from '../../context/userContext';

export default function Register({ handleClose, handleShow, toggle, show }) {
  const title = "Register";
  document.title = "WaysBeans | " + title;

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  //destructering objek from usestate register
  const { name, email, password } = form;

  //handle change value in form register
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);
      console.log(response);
      navigate('/')

       // Notification
       if (response.data.status == 'Success') {
        // const alert = (
        //   <Alert variant="success" className="py-1">
        //     Success
        //   </Alert>
        // );
        // setMessage(alert);
        // setForm({
        //   name: '',
        //   email: '',
        //   password: '',
        // });
      } else {
        // const alert = (
        //   <Alert variant="danger" className="py-1">
        //     Failed
        //   </Alert>
        // );
        // setMessage(alert);
      }
    } catch (error) {
      // const alert = (
      //   <Alert variant="danger" className="py-1">
      //     Failed
      //   </Alert>
      // );
      // setMessage(alert);
      console.log(error);
    }
  });
  // end of integration

  return (
    <>
      <button className="btn-register" onClick={handleShow}>
        Register
      </button>

      <Modal show={show} onHide={handleClose} className="p-5 my-3">
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)} className="p-3">
            <h1 className="form-title my-3">Register</h1>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-input"
                type="text"
                placeholder="Full Name"
                value={name}
                name="name"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-input"
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                className="form-input"
                type="password"
                value={password}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid gap-1 mb-3">
              <button className="btn-form" type="submit">
                Register
              </button>
            </div>
          </Form>
          <div className="textMuted">
            You Have an account ? Klik{" "}
            <span className="click-here" onClick={toggle}>
              Here
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}