import React from 'react'
import ProfileComplain from '../assets/ProfileComplain 1.png'
import iconOnline from '../assets/iconOnline.png'
import iconSend from '../assets/iconSend.png'

export default function Chat ({contact, user, messages, sendMessage, handleChange, click}) {
    
    return (
        <>
            {contact ? (
                <>
                <div className="rightComplain">
                    <div className='headerChat'>
                        <div className="leftHeaderChat">
                            <img src= {contact.profile?.image || ProfileComplain} alt="profile"/>
                        </div>
                        <div className="rightHeaderChat">
                            <h5>{contact.name}</h5>
                            <div className='onlineChat'>
                                <div className='icon' >
                                    <img src={iconOnline} alt="online"/>
                                </div>
                                <div className='pChat'>
                                    <p>online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="containerMassage">
                        {messages.map((item, index) => (
                            <div key={index} className={`d-flex ${item.idSender == user.id ? "justify-content-end": "justify-content-start"}`}>
                                <div className="chatOne">
                                    {item.message}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="massage">
                        <div className="input">
                            <input onChange={handleChange} placeholder="Write your message here ..." type="text" onKeyPress={sendMessage} />
                        </div>
                        <div className="iconSend pointer" >
                            <img src= {iconSend} alt='send'  />
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <div className="rightComplain">
                        <div className='headerChat'>
                            <div className="leftHeaderChat">
                            </div>
                            <div className="rightHeaderChat">
                                <div className='onlineChat'>
                                    <div className='pChat'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="containerMassage">
                            <h1 style={{ 
                            marginLeft: 320,
                            marginTop:230
                            }}> 
                            NO MASSAGE </h1>
                        </div>
                </div>
            )}
        </>
    )
}