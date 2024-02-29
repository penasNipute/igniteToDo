const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers

  const user = users.find( (user) => user.username === username)

  if(!user){
    return response.status(400).json({error:"User not Found"})
  }

  request.user = user
  return next()
}

app.get('/users', (request,response) => {
  response.status(200).json(users)
})

app.post('/users', (request, response) => {
  const { name, username } = request.body

  const user = users.find( (user) => user.username === username)

  if(user){
    return response.status(400).json({error:"User already exists"})
  }

  users.push({
    id: uuidv4(), name, username, todos:[] 
  })

  return response.status(201).json({message:'Usuer created succcessfully!'})
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request

  return response.status(200).json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body

  const { user } = request

  user.todos.push({
    id:uuidv4(), title, done: false, deadline:new Date(deadline), created_at: new Date()
  })

  return response.status(201).json({message:"Task created sucessfully!"})

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;