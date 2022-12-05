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

    }, 1000 * 10)
    return () => {
      clearInterval(intervsalId)
    }
  }, [messages])

  return (

    <MessagesList messages={messages} setMessages={setMessages} />

  )
}

///qqq what are keys for? examples

const DeleteMessage = (props) => {

  const deleteMessageWithId = (id) => {
    fetch(`http://localhost:3000/messages/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          alert("Delete successfully")
        } else {
          alert("Something went wrong...")
        }
      })

  }

  return (
    <button onClick={() => deleteMessageWithId(props.id)}>Delete</button>
  )
}


const MessagesList = (props) => {

  //qqq to delete a message, use splice() or filter() + setMessages()?

  const messages = props.messages

  const listItems = messages.map((message) => <li key={message.id} className="list-group-item">From:{message.from} {message.text} {message.timeSent}
    <DeleteMessage id={message.id} /></li>)

  return <ul className='list-group'>{listItems}</ul>
}




// const LoadMessageButton = () => {
//   return (
//     <button className='btn btn-primary'>More</button>
//   )
// }

const DeleteButton = (props) => {
  const id = props.id
  const handleClick = (event) => {
    console.log(event)
  }

  return (
    <button className='btn btn-danger mx-5' onClick={handleClick}>Delete</button>
  )
}



export default App;
