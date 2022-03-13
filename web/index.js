const express = require('express');
const path = require('path');
const query_func = require('../fabcar/javascript/query.js');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/getferko', async (req, res) => {
    let result = await query_func('queryStudentsByName', 'Ferko Mrkvicka');
    res.send(result.toString());
})

app.get('/students', async (req, res) => {
    let result = await query_func('getAllStudents');
    res.send(result.toString());
})

app.get('/students/:id', async (req, res) => {
    let result = await query_func('queryStudentsById', req.params.id);
    res.send(result.toString());
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Web server started on port ${PORT}`));