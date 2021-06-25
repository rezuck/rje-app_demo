const express = require('express');
const { removeAllListeners } = require('gulp');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const users = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/my-app/dist/rje-app5/"));

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user added");
});

app.put('/api/user', (req, res) => {
  const user = req.body.user;
  const idval = user.id;
 
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === idval) {
      console.log("Id = " + i);
      users[i].firstName = user.firstName;
      users[i].lastName = user.lastName;
      users[i].team = user.team;
      users[i].job = user.job;
      users[i].status = user.status;

      break;
    }
  }
  
  res.json("user updated");
});

app.delete('/api/users/:id', (req, res) => {
  const idval = req.params.id;
  
  for (var i = 0; i < users.length; i++) {
    let uid = users[i].id.toString();

    if (uid === idval) {
      users.splice(i, 1);
      break;
    }

  }
    
  res.json("user deleted");
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/dist/rje-app5/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
