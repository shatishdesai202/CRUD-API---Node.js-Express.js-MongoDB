const express = require('express');

const router = express.Router();

const data = require('../models/database');

router.get('/', async (req, res) => {

    try {

        const alldata = await data.find();
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
        res.json(showDatas);
    } catch (error) {
        res.send("Error In Post -> " + error);
    }

});

router.get('/getbyid/:id', async (req, res) => {

    try {
        const showdata = await data.findById(req.params.id);
        
        res.json(showdata);
    } catch (error) {
        res.send("ERROR " + error);
    }

});

router.patch('/update/:id', async (req, res)=>{

    try {
        const updateData = await data.findByIdAndUpdate(req.params.id, {name: req.body.name, surname: req.body.surname, age: req.body.age} );
        updateData.save();
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
        res.json('data deleted');
    } catch (error) {
        res.send("ERROR "+error);
    }
});

module.exports = router;