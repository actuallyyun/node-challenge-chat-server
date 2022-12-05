import './App.css';
import React, { useEffect, useState } from "react"

function App() {



  return (
    <div className="App">

      <div className="container">
        <div className="row">
          <div className="col-6">
            <h2>Latest Messages </h2>
            <LatestMessages />
          </div>
        </div>
      </div>
    </div>
  );
}



const LatestMessages = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    //qqq is it a good idea to re-fetch every 30 s?

    const intervsalId = setInterval(() => {

      fetch("http://localhost:3000/messages")
        .then(res => res.json())
        .then(data => {

          setMessages(data)
        })

    }, 1000 * 30)
    return () => {
      clearInterval(intervsalId)
    }

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


// const LoadMessageButton = () => {
//   return (
//     <button className='btn btn-primary'>More</button>
//   )
// }



export default App;
