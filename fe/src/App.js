import './App.css';
import React, { useEffect, useState } from "react"

function App() {



  return (
    <div className="App">

      <div className="container">
        <div className="row">
          <div className="col-6">
            <h2>Latest Messages</h2>
            <LatestMessages />
          </div>
        </div>
      </div>
    </div>
  );
}



const LatestMessages = () => {
  const [messages, setMessages] = useState([])
  console.log("messages", messages)
  useEffect(() => {
    console.log("useEffect called")

    fetch("http://localhost:3000/messages")
      .then(res => res.json())
      .then(data => {
        console.log("data", data)
        setMessages(data)
      })
  }, [])

  return (

    <MessagesList messages={messages} />

  )
}

const MessagesList = (props) => {
  const messages = props.messages
  const listItems = messages.map((message, index) => <li key={index} className="list-group-item">From:{message.from} {message.text}</li>)
  return <ul className='list-group'>{listItems}</ul>
}
export default App;
