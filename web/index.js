const express = require('express');
const path = require('path');

// for password hashing, will use when in employee registration is implemented
const bcrypt = require('bcrypt');

// json web token, used for login
const jwt = require('jsonwebtoken');
const secret_key = 'topsecret';

const query_func = require('../fabcar/javascript/query.js');
const register_func = require('../fabcar/javascript/registerUser.js');
const enroll_admin = require('../fabcar/javascript/enrollAdmin.js');
const e = require('express');

const app = express();
app.use(express.urlencoded());
app.use(express.json());


// create admin user to allow creation of other users
// comment out if implementing functionality without the need to interact with the ledger
// enroll_admin();


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