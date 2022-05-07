const express = require('express');
const cors = require('cors');
const path = require('path');

// for password hashing, will use when in employee registration is implemented
const bcrypt = require('bcrypt');

// json web token, used for login
const jwt = require('jsonwebtoken');
const secret_key = 'topsecret';

const query_func = require('../fabcar/javascript/query.js');
const register_func = require('../fabcar/javascript/registerUser.js');
const enroll_admin = require('../fabcar/javascript/enrollAdmin.js');

const app = express();
app.use(express.urlencoded());
app.use(express.json());

//const student = require('./Models/student')

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

app.post('/login', async (req, res) =>{
    
    // TODO: retrieve user info from DB
    const user = {
        id: 1,
        username: "test",
        email: "email@email.com"
    };
    
    jwt.sign({user: user}, secret_key, {expiresIn: '2h'}, (err, token) => {
        res.json({
            token: token
        });
    });
    
})

// used for testing purposes, path '/protected' requires an auth token
app.get('/protected', verify_token, (req, res) => {
    jwt.verify(req.token, secret_key, (err, auth_data) => {
        if(err){
            res.sendStatus(403);
        } else{
            res.json({
                message: "Protected page accessed successfully.",
                auth_data
            })
        }
    });
})

function verify_token(req, res, next) {
    const bearer_header = req.headers['authorization'];
    if(typeof bearer_header !== 'undefined'){
        const bearer = bearer_header.split(' ');
        const bearer_token = bearer[1];
        req.token = bearer_token;
        next();
    } else {
        // return forbidden if token is invalid
        res.sendStatus(403)
    }
}

const students = require('./Routes/students')
const programme = require('./Routes/programme')
const lecturers = require('./Routes/lecturers')
const roles = require('./Routes/roles')
const users = require('./Routes/users')
const results = require('./Routes/results')
const courses = require('./Routes/courses')
const initializeData = require('./initialData')

app.use('/students', students)
app.use('/programme', programme)
app.use('/lecturers', lecturers)
app.use('/roles', roles)
app.use('/users', users)
app.use('/results', results)
app.use('/courses', courses)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Web server started on port ${PORT}`));
initializeData.initializeData()