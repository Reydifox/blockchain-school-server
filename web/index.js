const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https')
const fs = require('fs')
var crypto = require('crypto')
const session = require('express-session');

// for password hashing, will use when in employee registration is implemented
const bcrypt = require('bcrypt');

// json web token, used for login
const jwt = require('jsonwebtoken');
const secret_key = 'topsecret';

const query_func = require('../fabcar/javascript/query.js');
const register_func = require('../fabcar/javascript/registerUser.js');
const enroll_admin = require('../fabcar/javascript/enrollAdmin.js');

const app = express();

app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

const { get_userInfo, post_updateUser, get_userRole } = require('./Auth/auth.js');
const roleModel = require('./Models/role')
const { request } = require('http');
const { response } = require('express');
const { post } = require('./Routes/students');
const role = require('./Models/role');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

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
    let email = req.body.email;
    let password = req.body.password; 
    var hash = crypto.createHash('md5').update(password).digest('hex')
    const user = await get_userInfo(email,hash);
    if ('email' in user) {
        req.session.loggedin = true;
        req.session.user = user;
        req.params.user_id = user._id;
        if ('user_role_id' in user) {
            const role = await get_userRole(user.user_role_id);
        } else {
            const role = {}
        }
        jwt.sign({user: user}, secret_key, {expiresIn: '2h'}, (err, token) => {
            res.json({
                successful: "True",
                token: token,
                user: user,
                role: role,
            });
        });
    }
    else {
        res.json({
            successful: "False"
        })
    }
    
})

// if user is logged in, it will show his email
app.get('/home', function(req,res){
    if(req.session.loggedin){
        res.send("Welcome, " + req.session.user.email);
    }
    else {
        res.send("Please log in");
    }
})

app.get('/logout', function(req,res){
    req.session.loggedin = false
    res.send("You have been succesfully logged out")
})

app.get('/changePassword', async function(req,res){
    if(req.session.loggedin){
        const user = req.session.user;
        var newHash = crypto.createHash('md5').update(req.body.password).digest('hex');
        user.password = newHash;
        const result = await post_updateUser(user);
        if(result.successful){
            res.send("Password changed succesfully");
        }      
    }
    else {
        res.send("Please log in to change password");
    }
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

https.createServer({
    key: fs.readFileSync('../../key.pem'),
    cert: fs.readFileSync('../../cert.pem')
},app).listen(PORT, () => console.log(`Web server started on port ${PORT}`));
//app.listen(PORT, () => console.log(`Web server started on port ${PORT}`));
initializeData.initializeData()