
const express = require('express');
const router = express.Router();// used for initializing the express router, for navigations and the use of url

//-- User Defined Moddules
const Hobbies = require("./../modules/hobbies.module");


//the "Createperson" exports from the person controller
router.post('/createhobbies', async (req, res) => {
    // the "Createperson" is used by the router to help determine which route to follow once a specific url is requested.   

 const hobby = new Hobbies(req.body);

 await hobby.save((err, data) => {
     if(err)
     {
         res.send(err);
         console.log(err);
     }
     res.send({
         Message: "Successful",
         data: data
     });
 });

}
); 

// the "allPersonDetails" exports from the person controller and gets all persons on the database 
router.get('/getallhobbies', (req, res) => {
    // the "allPersonDetails" is used by the router to help determine which router to follow once a specific url is requested.   
        
        const Hobbies1 = new Hobbies(req.body);
        
        Hobbies.find(req.params,(err, Hobbies1) => {
                //code used to get all person details
        
                if(err) return next(err);
                res.send(Hobbies1);
            });
        });


// the "personDetails" exports from the person controller and gets person by their id
router.get('/gethobbiesbyid/:id', (req, res) => {
    // the "personDetails" is used by the router to help determine which router to follow once a specific url is requested.   
    
    const Hobbies1 = new Hobbies(req.body);
    
    Hobbies.findById(req.params.id, (err, Hobbies1) => {
            //code used to get person details by their id
    
            if(err) return next(err);
            res.send(person1);
        });
    });


// the "updatePerson" exports from the person controller and updates person by their id
router.put('/updatehobbies/:id', (req, res) => {
    // the "personDetails" is used by the router to help determine which router to follow once a specific url is requested.   
    
    const Hobbies1 = new Hobbies(req.body);
    
    Hobbies.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, Hobbies1) => {
            //code used to get person details by their id
    
            if(err) return next(err);
            res.send("Hobbies are updated");
        });
    }); 

// the "updatePerson" exports from the person controller and updates person by their id
router.delete('/deletehobbies/:id', (req, res) => {
    // the "personDetails" is used by the router to help determine which router to follow once a specific url is requested.   
    
    const Hobbies1 = new Hobbies(req.body);
    
    Hobbies.findByIdAndDelete(req.params.id, {$set: req.body}, (err, Hobbies1) => {
            //code used to get person details by their id
    
            if(err) return next(err);
            res.send("Hobbies are deleted");
        });
    }); 

module.exports = router;