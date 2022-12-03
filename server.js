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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


app.get("/messages", (req, res) => {
  res.send(messages)
})

app.get("/messages/:id", (req, res) => {
  const id = req.params.id
  console.log(id)
  const message = messages.filter(message => message.id == id)
  res.send(message)
})

app.post("/messages", (req, res) => {
  if (validMessage(req.body)) {
    const messageContent = req.body
    const newMessage = { id: messages.length, from: messageContent.from, text: messageContent.text }
    messages.push(newMessage)
    console.log("messages", messages)
    res.send(newMessage)

  } else {
    res.status(400).send("Invalid message content.")
  }


})

const validMessage = (message) => {
  if (message.from === undefined || message.text === undefined || message.from === "" || message.text === "") {
    return false
  } else {
    return true
  }
}

app.delete("/messages/:id", (req, res) => {
  const msgId = req.params.id
  const index = messages.findIndex(id => messages.id == msgId)
  messages.splice(index, 1)
  res.status(202).send({ success: true })
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
});
