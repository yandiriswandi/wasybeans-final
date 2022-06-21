import React, { useState, useContext, useEffect } from "react";
// import styles from "../styles/Landing.module.css";
import { Modal, Dropdown, NavDropdown } from "react-bootstrap";
// import { Link, Navigate } from "react-router-dom";
// // import Transactions from "../components/Transactions";
// //import stylesN from "../components/Navbar.module.css";
import NavbarUser from "../components/Navbars/NavbarUser";
import Guetemala from "../assets/Guetemala.png"
import Trash from "../assets/trash.svg"
import styles from "../styles/Profile.module.css";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import asep from "../assets/asep.png"
import Icon from "../assets/Icon.png"




export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [isNull, setIsNull] = useState(false);


  const getProfile = async () => {
    try {
      const response = await API.get("/profile");
      setProfile(response.data.data);
      // console.log(response.data.data.image.slice(-4));
      if(response.data.data.image.slice(-4) == "null"){
        setIsNull(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await API.get("/transaction");
      setTransaction(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

        const body = JSON.stringify({status: status});
      const response = await API.patch(`/transaction/${id}`, body,config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getTransactions();
  }, []);
  return (
    <>
      <NavbarUser/>
      <div className={styles.page}>
        <div className={styles.mainProfile}>
          <div className={styles.myProfile}>
            <h4>My Profile</h4>
            <div className={styles.infoPerson}>
              {isNull ?(
              <div className="profilePic">
                <img
                  className={styles.profilePhoto}
                  id="outputProfile"
                  src={asep}
                  />
                  </div>
                ):(
                  <div className="profilePic">
                  <img
                    className={styles.profilePhoto}
                    id="outputProfile"
                    src={profile?.image}
                    />
                    </div>
                )}
              <article>
                <h5>Full Name</h5>
                <p>{state.user.name}</p>
                <h5>Email</h5>
                <p>{state.user.email}</p>
              </article>
            </div>
          </div>
        </div>
        <div className={styles.products} style={{height:400}}>
          <h4>My Transaction</h4>
         
          {transaction?.map((item) => (
              <div className={styles.product} >
                <div className={styles.detailProduct}>
                  <img
                    src={item.products.image}
                    className={styles.photoProduct}
                    alt="menu pict"
                  />
                  <div className={styles.number}>
                    <p className={styles.productName}>{item.products?.map((item) =>(`${item.name} `))}</p>
                    <p className={styles.date}>
                      {item.createdAt}
                    </p>
                    <p className={styles.productPrice}>
                      Price : Rp 20
                    </p>
                    <p className={styles.productQty}>
                      Qty : 2
                    </p>
                    <p className={styles.subTotal}>
                      Sub Total : {item.qty}
                    </p>
                  </div>
                </div>
                <div className={styles.productr}>
                  <img
                    src={Icon}
                    alt="waysbeans icon"
                   style={{height:30}}
                  />
                  
                    <div className={styles.status}>{item.status}</div>
                
                     <button
                      className={styles.statuso}
                    onClick={()=> {updateStatus(item.id, "completed")}}
                    >
                      Completed
                    </button>
                </div>
              </div>
          ))}
          
           
        </div>
      </div>
     
    
    </>
  );
}