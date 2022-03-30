const express = require('express');
const path = require('path');
const query_func = require('../fabcar/javascript/query.js');
const register_func = require('../fabcar/javascript/registerUser.js');
const enroll_admin = require('../fabcar/javascript/enrollAdmin.js');

const app = express();
app.use(express.urlencoded());
app.use(express.json());


// create admin user to allow creation of other users
enroll_admin();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'))
})

app.post('/register', async (req, res) => {
    let result = await register_func(req.body.username);
    res.send(`Successful: ${result.result}, message: ${result.message}`)
})

app.get('/getferko', async (req, res) => {
    let result = await query_func('queryStudentsByName', 'Ferko Mrkvicka');
    res.send(result.toString());
})

app.get('/:username/students', async (req, res) => {
    let result = await query_func(req.params.username, 'getAllStudents');
    res.send(result.toString());
})

app.get(':username/students/:id', async (req, res) => {
    let result = await query_func(req.params.username, 'queryStudentsById', req.params.id);
    res.send(result.toString());
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Web server started on port ${PORT}`));