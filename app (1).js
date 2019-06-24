const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.locals.products = [
    {
        name: "Iphone XS",
        category: "Smartphone",
        price: 5000
    },
    {
        name: "Samsung Galaxy S10",
        category: "Smartphone",
        price: 3000
    },
    {
        name: "Huawei Mate 20 Pro",
        category: "Smartphone",
        price: 3500
    }
];

app.get('/products', (req, res) => {
    res.status(200).json(app.locals.products);
});

app.post('/products', (req, res, next) => {
    if(JSON.stringify(req.body)=="{}"){
        res.status(500).json({message: "Body is missing"});
    }
    let body = JSON.stringify(req.body);
    if(!req.body.name || !req.body.category || !req.body.price){
        res.status(500).json({message: "Invalid body format"});
    }
    else if(req.body.price<0){
          res.status(500).json({message: "Price should be a positive number"});
    
    }else{
         
    let ok=0;     
    for(let i=0;i<app.locals.products.length;i++){
      
        if(app.locals.products[i].name==req.body.name){
             ok=1;
             res.status(500).json({message: "Product already exists"});
        }
    }   
    if(ok!=1){
          let product = {
        "name": req.body.name,
        "category": req.body.category,
        "price": req.body.price
    }

        app.locals.products.push(product);
    // res.status(400).json({message: 'Bad request'});
        res.status(201).json({message: 'Created'});
    }
    }
  
   
})

module.exports = app;