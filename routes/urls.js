const express = require('express');

const router = express.Router();

const data = require('../models/database');

router.get('/', async (req, res) => {

    try {

        const alldata = await data.find();
        
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials",true);
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');


        res.json(alldata);

    } catch (error) {

        console.log(error);
        res.send("ERROR -> " + error);        
    
    }

    // res.send('something is here');

});

router.post('/signup', async (req, res) => {

    const newData = new data({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age
    });

    try {
        // res.send('ok');
        const showDatas = await newData.save();

        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials",true);
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');


        res.json(showDatas);
    } catch (error) {
        res.send("Error In Post -> " + error);
    }

});

router.get('/getbyid/:id', async (req, res) => {

    try {
        const showdata = await data.findById(req.params.id);

        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials",true);
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
        
        res.json(showdata);
    } catch (error) {
        res.send("ERROR " + error);
    }

});

router.patch('/update/:id', async (req, res)=>{

    try {
        const updateData = await data.findByIdAndUpdate(req.params.id, {name: req.body.name, surname: req.body.surname, age: req.body.age} );
        updateData.save();

        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials",true);
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');

        const x = await data.findById(req.params.id);
        res.json(x);
    } catch (error) {
        res.send("ERROR " + error);
    }

});


router.delete('/delete/:id',  async(req, res)=>{
    
    const ids = req.params.id;
    try {
        const deleteData = await data.findByIdAndDelete(ids);
        // deleteData.save()

        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials",true);
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');

        res.json('data deleted');
    } catch (error) {
        res.send("ERROR "+error);
    }
});

module.exports = router;