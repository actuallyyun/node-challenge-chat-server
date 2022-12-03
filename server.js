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

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// - [ ] Create a new message
// - [ ] Read all messages
// - [ ] Read one message specified by an ID
// - [ ] Delete a message, by ID
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
  const message = req.body
  messages.push(message)
  res.send(message)

})


app.delete("/messages/:id", (req, res) => {
  const msgId = req.params.id
  const index = messages.findIndex(id => messages.id == msgId)
  messages.splice(index, 1)
  console.log("aftr splice", messages)
  res.status(202).send({ success: true })
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
});
