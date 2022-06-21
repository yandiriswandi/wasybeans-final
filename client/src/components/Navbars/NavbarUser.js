import React, { useState } from "react";
import { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import { UserContext } from "../../context/userContext";
import { Link, Navigate } from "react-router-dom";

import iconBrand from "../../assets/Icon.png";

//import react icons
// import { BsCart4 } from "react-icons/bs";

//components
import Login from "../modals/Login";
import Register from "../modals/Register";
import DropDownUser from "../dropdowns/DropDownUser";
import DropDownAdmin from "../dropdowns/DropDownAdmin";

export default function NavbarUser({ click }) {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowRegister = () => setShowRegister(true);
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseSignup = () => setShowRegister(false);
  const handleCloseSignin = () => setShowLogin(false);

  const toggleLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const toggleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  //initial userContext here...
  const [state, dispatch] = useContext(UserContext);
  if (state.isLogin === false) {
    return (
      <Navbar className="5vh navbars fixed-top" style={{ backgroundColor: "#F5F5F5" }}>
        <Container>
          <Navbar.Brand>
            <img
              src={iconBrand}
              width="130"
              alt="ReactBootstraplogo"
              onClick={click}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <div className="d-grid gap-2 d-lg-block">
                <Login
                  show={showLogin}
                  handleShow={handleShowLogin}
                  handleClose={handleCloseSignin}
                  toggle={toggleRegister}
                />{" "}
                <Register
                  show={showRegister}
                  handleShow={handleShowRegister}
                  handleClose={handleCloseSignup}
                  toggle={toggleLogin}
                />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else if (state.user.status === "customer") {
    return (
      <Navbar className="5vh navbars fixed-top" style={{ backgroundColor: "#F5F5F5" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/">
            <img
              src={iconBrand}
              width="130"
              alt="ReactBootstraplogo"
              onClick={click}
            />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              {/* <BsCart4 size={40} /> */}
              <DropDownUser />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="5vh navbars fixed-top" style={{ backgroundColor: "#F5F5F5" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/admin-dashboard">
            <img
              src={iconBrand}
              width="130"
              alt="ReactBootstraplogo"
              onClick={click}
            />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <DropDownAdmin />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}