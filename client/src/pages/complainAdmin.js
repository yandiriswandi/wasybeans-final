import React, { useEffect, useState, useContext } from "react";
import NavbarUser from "../components/Navbars/NavbarUser";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import User from "../assets/zayn.png";
import { io } from "socket.io-client";
import { UserContext } from "../context/userContext";
import Contact from '../components/contact'
import Chat from '../components/chat'

let socket;

export default function ComplainAdmin() {
  const [contacts, setContacts] = useState([]); // data contact dari server
  const [contact, setContact] = useState(null); // data contact yang diklik
  const [state] = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const loadContacts = () => {
    socket.emit("load customer contacts");
    socket.on("customer contacts", (data) => {
      let dataContacts = data.map((item) => ({
        ...item,
        message: "Click here to start message",
      }));
      console.log(dataContacts);
      setContacts(dataContacts);
    });
  };

  const loadMessages = () => {
    socket.on("messages", (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      }
      loadContacts();
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      socket.emit("send message", data);
      e.target.value = "";
    }
  };

  useEffect(() => {
    socket = io("http://localhost:5000",{

        auth: {
          token: localStorage.getItem("token"),
        },
        query: {
          id: state.user.id,
        },
      }
    );

    socket.on("new message", () => {
      console.log("contact : ", contact);
      socket.emit("load messages", contact?.id);
    });

    loadContacts();
    loadMessages();


    socket.on("connect_error", (err) => {
      console.log(err.message); //Not Authorized
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const onClickContact = (data) => {
    setContact(data);
    socket.emit("load messages", data.id);
  };

  useEffect(() => {
    console.log(contacts)
  }, []);

  return (
    <div>
      <NavbarUser />
      <div className="containerComplain">
            <div className="leftComplain">
               <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
               </div>
                <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
            </div>
      </div>
  );
}