import React,{useState} from 'react'
import "./Chat.css"
import axios from './axios';

import {Avatar , IconButton} from "@material-ui/core";
// import DonutLargeIcon from '@material-ui/icons/DonutLarge';
// import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
// import ChatIcon from '@material-ui/icons/Chat';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
function Chat({ messages }) {

    const [input , setInput]=useState('')

    const sendMessage = async (e)=>{
        e.preventDefault(); //preventing refreshing of the browser
       await axios.post('/messages/new',{
            message:input,
            name:"Demo App",
            timestamp:"just now",
            received:true
        });
        setInput('');
        };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>

                <div className="chat__headerInfo">
                     <h3>Room Name</h3>
                     <p>last seen at...</p>
                </div>

                 <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                         <AttachFileOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                         <MoreVert/>
                    </IconButton>
                </div>
             </div>

            <div className="chat__body">
            {messages.map((message)=>(
                <p className={`chat__message ${message.received && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timeStamp">{message.timestamp}</span>
            </p>
            ))}


            {/* <p className="chat__message">
            <span className="chat__name">Anoop</span>
            This will be a message
            <span className="chat__timeStamp">{new Date().toUTCString()}</span>
            </p>
            <p className="chat__message">
            <span className="chat__name">Anoop</span>
            This will be a message
            <span className="chat__timeStamp">{new Date().toUTCString()}</span>
            </p>
            <p className="chat__message">
            <span className="chat__name">Anoop</span>
            This will be a message
            <span className="chat__timeStamp">{new Date().toUTCString()}</span>
            </p>

            <p className="chat__message chat__receiver">
            <span className="chat__name">Anoop</span>
            This will be a message
            <span className="chat__timeStamp">{new Date().toUTCString()}</span>
            </p>
            <p className="chat__message chat__receiver">
            <span className="chat__name">Anoop</span>
            This will be a message
            <span className="chat__timeStamp">{new Date().toUTCString()}</span>
            </p>
            <p className="chat__message chat__receiver">
            <span className="chat__name">Anoop</span>
            This will be a message
            <span className="chat__timeStamp">{new Date().toUTCString()}</span>
            </p> */}
        </div>  
        <div className="chat__footer">
        <InsertEmoticon />
        <form>
            <input value={input} 
            onChange={e=>setInput(e.target.value)} 
            placeholder="Type a message" 
            type="text"/>
            <button onClick={sendMessage} type="submit"> submit</button>
        </form>
        <MicIcon />
        </div>
        </div>
    )
}

export default Chat
