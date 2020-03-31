const express = require('express');
const bodyParser= require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = {
    users:[
        {
            id:'123',
            name:'John',
            email: 'john@mail.com',
            password:"cookies",
            entries:0,
            joined:new Date()
        },
        {
            id:'124',
            name:'Shae',
            email: 'shae@mail.com',
            password:"apples",
            entries:0,
            joined:new Date()
        }
    ],
    login:[
        {
            id:'987',
            hash:'',
            email:'john'
        }
    ]
}

app.get('/', (req,res)=>{
    res.send(db.users);
});

app.post('/signin',(req,res)=>{
    bcrypt.compare("cookies", '$2a$10$vGtzvJ8jYMTRYmP6FojEieZSesn4sjPm.pxwQKVtZFtAiwGdGmrES', (err, res)=>{
        console.log(res);
    }); 
    if(req.body.email === db.users[0].email && req.body.password === db.users[0].password){
        res.status(200).json(db.users[0]);
    }else{
        res.status(404).json('user not in bd');
    }
});

app.post('/register',(req,res)=>{
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null,null,(err, hash) =>{
    //     console.log(hash);
    // });

    db.users.push({
        id:'125',
        name:name,
        email: email,
        entries:0,
        joined:new Date()
    });
    res.status(200).json(db.users[db.users.length-1]);
});

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    let found= false;
    db.users.forEach(user => {
        if(user.id === id ){
            console.log(user.name)
            found = true;
            return res.json(user);
        }
    });
    if(found === false){
        res.status(404).json('notfound')
    }
});

app.put('/image', (req,res)=>{
    const {id} = req.body;
    let found= false;
    db.users.forEach(user => {
        if(user.id === id ){
            user.entries++;
            found = true;
            return res.json(user.entries);
        }
    });
    if(found === false){
        res.status(404).json('notfound')
    }
});

var listener = app.listen(5000,()=>{
    console.log('app running on port ' + listener.address().port);
});


// {
// 	"id":"126",
// 	"name":"denisa",
// 	"email":"denisa@mail.com"
// }