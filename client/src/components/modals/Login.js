import React, { useContext, useState } from "react";

//react bootsrtap
import { Modal, Form } from "react-bootstrap";

//react router dom
import { useNavigate } from "react-router-dom";

//use query
import { useMutation } from "react-query";

//sweetalert
import Swal from "sweetalert2";

//use context
import { UserContext } from "../../context/userContext";

//import api
import { API } from "../../config/api";

export default function Login({ show, handleClose, handleShow, toggle }) {
  const title = "Login";
  document.title = "WaysBeans | " + title;

  let api = API();
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
       // Data body
       const body = JSON.stringify(form);

      // Insert data user to database
       const response = await API.post('/login', body, config);
       const user = response.data.data.user;
      console.log(user);

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
       // Status check
       if (user.status === 'admin') {
        navigate('/add-product');
      } else {
        navigate('/');
      }
} catch (error) {
  // const alert = (
  //   <Alert variant="danger" className="py-1">
  //     Login failed
  //   </Alert>
  // );
  // setMessage(alert);
  console.log(error);
}
});

  return (
    <>
      <button onClick={handleShow} className="btn-login ">
        Login
      </button>

      <Modal show={show} onHide={handleClose} className="p-5 my-2">
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)} className="p-4">
            <p className="form-title my-3">Login</p>
            <Form.Group className="mb-3 ">
              <Form.Control
                className="form-input"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                className="form-input"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <div className="d-grid gap-1 mb-3">
              <button className="btn-form" type="submit">
                Login
              </button>
            </div>

            <Form.Group>
              <div className="textMuted">
                Don't have an account ? Klik{" "}
                <span className="click-here" onClick={toggle}>
                  Here
                </span>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}