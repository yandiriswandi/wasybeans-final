import React from 'react'
import ProfileComplain from '../assets/ProfileComplain 1.png'

 export default function Contact ({ dataContact, clickContact, contact}) {
    return (
        <>
            {dataContact.length > 0 && (
                <>
                {dataContact.map((item) => (
                <div 
                    key={item.id}
                    className={`leftComplain ${
                        contact?.id === item?.id && "contact-active"
                      }`}
                      onClick={() => {
                        clickContact(item);
                      }}
                >
                    <div className='contact'>
                        <div className="leftContact">
                            <img src= {item.profile?.image || ProfileComplain} alt="profile"/>
                        </div>
                        <div className="rightContact">
                            <h6>{item.name}</h6>
                        </div>
                    </div>
                </div>
                ))}
                </>
            )}    
        </>
    )
}