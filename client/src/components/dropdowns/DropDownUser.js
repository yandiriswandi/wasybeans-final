import React, { useContext, useState, useEffect } from "react";

//userContext
import { UserContext } from "../../context/userContext";

//boostrap component
import { Dropdown,Container,NavDropdown } from "react-bootstrap";

//react icons
import { HiOutlineUser } from "react-icons/hi";
import { TiMessages } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";

//import image
import profile from "../../assets/profile.png";
import cart from "../../assets/cart.png"

//use react router dom
import { Link, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";

export default function DropDownUser() {
  //move page
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [qtyCart, setQtyCart] = useState(0);
  //function logout and delet token
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/auth");
  };
  const getProductCart = async () => {
    try {
      const response = await API.get("/cart");
      setQtyCart(response.data.data.length);
      // console.log(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductCart()
  
  }, [state]);
  return (
    <Dropdown>
      <Container className="d-flex">
       <div className="pointer me-2 mt-3" onClick={() => {navigate("/cart")}}>
          <img src={cart} alt="cart" />
            {qtyCart ? (
            <span 
              style={{
                fontSize:14, 
                position:'absolute', 
                marginLeft:-8
              }}
              className="bg-danger rounded-circle text-light px-1 ">
                {qtyCart}
            </span>
            ):(
              <></>
            )}
       </div>
      <Dropdown.Toggle className="border-profile" variant="ligt">
        <img className="avatar" src={profile} width={30} alt="avatar" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          <HiOutlineUser color="chocolate" size="40px" className="me-2"/> Profile
        </Dropdown.Item>
        <Dropdown.Divider  size="40px" />
        <Dropdown.Item as={Link} to="/complain">
          <TiMessages  size="40px" className="me-2"/> Complain
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>
          <IoIosLogOut  color="red" size="40px"  className="me-2"/> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
       </Container>
    </Dropdown>
  );
}