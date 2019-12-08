const express = require('express');
const router = express.Router();// used for initializing the express router, for navigations and the use of url

//--- User Defined Modules
const Person = require("./../modules/person.module");
const Address = require("./../modules/address.module");
const Hobbies = require("./../modules/hobbies.module");

/* 
CRUD sequence and rules are as follows:

1. All paths must be small letters eg. router.post('path') 
2. CRUD sequence
  - getallperson
  - getpersonbyid
  - createperson
  - updatepersonbyid
  - deletepersonbyid

getP
*/

// GetAllPerson endpoint
router.get('/getallperson', async (req, res) => {
    const persons = await Person.find({});   

    res.send(persons);
});

// GetPersonById Endpoint

router.get('/getpersonbyid/:id', (req, res) => {   
    
    Person.find({}).then((data) => {
        res.send(data);

    }).catch((err) => {
        if(err)
        {
            throw new Error(`Oops!! 1040 Error occured: ${err}`);
        }
    }); 
});

// CreatePerson endpoint
router.post('/createperson', (req, res) => { 
    
    const address = new Address({
       // _id: new mongoose.Types.ObjectId(),
        addr1: req.body.addr1,
        addr2: req.body.addr2,
        addr3: req.body.addr3
    });

    address.save((err) => {
        //if (err) return handleError(err);
        if(err)
        {
            throw new Error(`Oops!! 1010 Error occured: ${err}`);
        };

        const person1 = new Person({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            gender: req.body.gender,
            hobbies: req.body.hobbies,
            address: address._id    // assign the _id from the address
       });
  
       person1.save().then((data) => {
           res.send(data);

       }).catch((err) => {
         if(err)
             {
                throw new Error(`Oops!! 1020 Error occured: ${err}`);
            };
        });
    });
    }
    ); 

// UpdatePersonById
router.put('/updatepersonbyid/:id', (req, res) => {
  
    Person.find(req.params.id).then(AddressData => {
        
        Address.findOneAndUpdate(AddressData.address, req.body).then((data) => {
            res.send(data);
           }).catch((err) => {
                if(err){
        
                throw new Error(`Oops!! 1050 Error occured: ${err}`);
                };
           });        
    });

    
    Person.findOneAndUpdate(req.params.id, req.body).then((data) => {
      res.send(data);

       }).catch((err) => {
            if(err){

               throw new Error(`Oops!! 1051 Error occured: ${err}`);
            };
        });
}); 

// DeletePersonById Endpoint
router.delete('/deletepersonbyid/:id', (req, res) => {   
        
    Address.findOneAndDelete(req.params.id, req.body).then((data) => {
        res.send(data);

    }).catch((err) => {
        if(err){
        
             throw new Error(`Oops!! 1060 Error occured: ${err}`);
        };
   });
    
    Person.findByIdAndDelete(req.params.id, req.body).then((data) => {
        res.send(data);

    }).catch((err) => {
        if(err){
        
         throw new Error(`Oops!! 1061 Error occured: ${err}`);
        };
    });
}); 


module.exports = router;
