import React,{useEffect,useState} from 'react';
// import useEffect from 'react';
// import useState from 'react';
import './App.css';
import Sidebar from "./Sidebar.js"
import Chat from "./Chat.js"
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [messages,setMessages]=useState([]);

  //Fetch all the initial information from the Db as soon as a new message is posted   
  useEffect(() => {
  axios.get('/messages/sync').then(response=>{
    console.log(response.data)
    setMessages(response.data);
  });  
  }, []);

  useEffect(() => {

    const pusher = new Pusher('5afaecde9e67c021e7c8', {
      cluster: 'eu'
    });

    //This sets up the listener to the pusher
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
      <Sidebar />
      <Chat messages={messages}/>
      </div>
    
    </div>
  );
}

export default App;
