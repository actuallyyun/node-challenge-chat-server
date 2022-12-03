const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];


const getMessageById = (req, res) => {
  const id = req.params.id
  const message = messages.find(message => message.id == id)
  const statusCode = message ? 200 : 400
  res.status(statusCode).send(message)
}


const updateMessageById = (req, res) => {
  const id = req.params.id
  const message = messages.find(message => message.id == id)
  message.text = req.body.text
  message.from = req.body.from

  res.send(message)

}

const deleteMessageById = (req, res) => {
  const msgId = req.params.id
  const indexToDelete = messages.findIndex(message => message.id == msgId)
  const foundIt = indexToDelete != -1

  const statusCode = foundIt ? 200 : 404
  const deletedMessage = foundIt ? (messages[indexToDelete]) : (null)

  if (foundIt) {
    messages.splice(indexToDelete, 1)
  }

  res.status(statusCode).send(deletedMessage)

}

const creatNewMessage = (req, res) => {
  const isValid = validMessage(req.body)

  const statusCode = isValid ? 201 : 400
  let createdMessage

  if (isValid) {
    const messageContent = req.body
    const timeSent = new Date()
    const newMessage = { id: messages.length, from: messageContent.from, text: messageContent.text, timeSent: timeSent }
    messages.push(newMessage)
    res.send(newMessage)
    createdMessage = newMessage

  }
  res.status(statusCode).send(createdMessage)
}

const validMessage = (message) => {
  if (message.from === undefined || message.text === undefined || message.from === "" || message.text === "") {
    return false
  } else {
    return true
  }
}


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


app.get("/messages/:id", getMessageById)

app.put("/messages/:id", updateMessageById)

app.delete("/messages/:id", deleteMessageById)

app.post("/messages", creatNewMessage)

app.get("/messages", (req, res) => {

  if (req.query.search) {
    const text = req.query.search.toLowerCase()
    const message = messages.filter(message => message.text.toLowerCase().includes(text))
    res.send(message)
  }

  if (req.query.latest) {
    const latestMsg = messages.filter(message => message.id < 10)
    res.send(latestMsg)
  }
  if (Object.keys(req.query) == 0) {
    res.send(messages)
  }
})








app.listen(3000, () => {
  console.log("Listening on port 3000")
});


