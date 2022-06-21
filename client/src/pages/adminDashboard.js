import React, { useState, useContext, useEffect } from "react";
import allow from "../assets/allow.png"
import deny from "../assets/deny.png"
import NavbarUser from "../components/Navbars/NavbarUser"
import DropDownAdmin from "../components/dropdowns/DropDownAdmin";

import { API } from "../config/api";


function AdminDashboard () {
    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        try {
          const response = await API.get("/transactions");
          setTransactions(response.data.data);
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
        getTransactions();
      }, []);

    return (
        <>
        <NavbarUser/>
        <body>
            <h1 class="h1Admin">Income Transaction</h1>
            <table className="mb-4">
                <tr>
                    <th class="no">No</th>
                    <th class="name">Name</th>
                    <th class="addresAdmin">Address</th>
                    
                    <th>Products Order</th>
                    <th>Status</th>
                    <th class="action">Action</th>
                </tr>
                {transactions?.map((item, index) => (
                <tr>
                    <td>{index+1}</td>
                    <td>{item.buyer.name}</td>
                    <td>{item.address}</td>
                    
                    <td>{item.products?.map((item) =>(`${item.name} `))}</td>
                    <td class="yellow">{item.status}</td>
                    <td class="btnAction">
                        <button class="cancel"  className="btn btn-danger pointer me-4" onClick={()=> {updateStatus(item.id, "cancel")}}>Cancel</button>
                        <button class="approve"  className="btn btn-success pointer" onClick={()=> {updateStatus(item.id, "approve")}}>Approve</button>
                    </td>
                </tr>
                ))}
            </table>
        </body>
    </>
    )
}

export default AdminDashboard