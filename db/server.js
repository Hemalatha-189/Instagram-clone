const express = require('express');
const cors=require('cors');
const db=require('./db.json')

const app= express();
app.use(cors());
app.use(express.json());

app.get('/endpoint', (req,res)=>{
    res.json(db.endpoint);
});

app.get('/data',(req,res)=>{
    res.json(db.data);
});

app.get('/profile',(req,res)=>{
    res.json(db.profile);
});


app.get('/suggestions',(req,res)=>{
    res.json(db.suggestions);
});

app.get('/stories',(req,res)=>{
    res.json(db.stories);
});

app.get('/followers',(req,res)=>{
    res.json(db.followers);
});
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
