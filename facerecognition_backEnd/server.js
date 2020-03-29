const express = require('express');
const bodyParser= require('body-parser')

const app = express();
app.use(bodyParser.json);

const db = {
    users:[
        {
            id:'123',
            name:'John',
            email: 'john@mail.com',
            password: 'cookies',
            entries:0,
            joined:new Date()
        },
        {
            id:'124',
            name:'Shae',
            email: 'shae@mail.com',
            password: 'bananas',
            entries:0,
            joined:new Date()
        }
    ]
}

app.get('/', (req,res)=>{
    res.send(bd.users);
});

app.post('/signin',(req,res)=>{
    if(req.body.email === db.users[0].email &&
        req.body.password === bd.users[0].password){
            res.json('succes');
    }else{
        res.status(404).json('user not in bd');
    }
});

app.post('/register',(req,res)=>{
    const { email, name, password } = req.body;
    db.users.push({
        id:'125',
        name:name,
        email: email,
        password: password,
        entries:0,
        joined:new Date()
    });
    res.status(200).json(db.users[db.users.length-1]);
});

var listener = app.listen(5000,()=>{
    console.log('app running on port ' + listener.address().port);
});
