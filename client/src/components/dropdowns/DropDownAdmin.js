import React, { useContext } from "react";

//userContext
import { UserContext } from "../../context/userContext";

//boostrap component
import { Dropdown } from "react-bootstrap";

//react icons
import { TiMessages } from "react-icons/ti";
import { GiCoffeeBeans } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";

//import image
import profile from "../../assets/profile.png";

//use react router dom
import { Link, useNavigate } from "react-router-dom";

export default function DropDownAdmin() {
  //move page
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  //function logout and delet token
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/auth");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle className="border-profile" variant="ligt">
        <img src={profile} width={30} alt="profile" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/addProduct">
          <GiCoffeeBeans color="chocolate" size="40px" className="me-2"/>Add Product
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/complain-admin">
          <TiMessages size="40px" className="me-2"/> Complain
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>
          <IoIosLogOut color="red" size="40px" className="me-2"/> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}