put to lounch

 http://localhost:4800/graphql


Person - create new Person
============================================================================================================

mutation {
    createPersons(
      name: "Ben",
      surname: "Nzuza",
      age: 10,
      gender: "Male",
      hobbies: ["5d8b14fc90a3a314a0f0a4e5"],
      address1: "Pretoria1",
      address2: "Pretoria2",
      address3: "Pretoria3",
      isDeleted: false,
      isActive: true
    ){
    _id
    name
    surname
    age
    gender
    hobbies{
      _id
      description
      isDeleted
      isActive
    }
    address{
      address1
      address2
      address3
      isDeleted
      isActive
    }
  }
}

Person - get Person by _id
============================================================================================================

query {
  getPersonById(personId: "5d8b1ad790a3a314a0f0a4ec"){
    _id
    name
    surname
    age
    gender
    address{
      _id
      address1
      address2
      address3
      isDeleted 
    	isActive
    }
    hobbies{
      _id
      description
      isDeleted 
    	isActive
    }
    isDeleted 
    isActive
  }
}

Person - update person by _id
============================================================================================================

mutation {
    updatePerson(
      personId: "5d91e07223dac72d70904023"
      name: "Benson Fam",
      surname: "Nzuza",
      age: 10,
      gender: "Male",
      hobbies: ["5d91c5ca39a94d303cfe10ef"],
      address1: "one"
      address2: "Two"
      address3: "Three"
      isDeleted: false,
      isActive: true
    ){
    _id
    name
    surname
    age
    gender
    hobbies{
      _id
      description
      isDeleted
      isActive
    }
  
    address{
      address1
      address2
      address3
    }
  }
}


Person - get all People
============================================================================================================

query {
  getAllPersons{
    _id
    name
    age
    surname
    gender
    isDeleted
    isActive
    
    hobbies{
      _id
      description 
      isDeleted 
      isActive 
    }
    
    address{
      _id
      address1
      address2
      address3
    }
    
  }
}


Hobbies - create new hobby
============================================================================================================

mutation {
    createHobby(
      description: "Cooking"
      isDeleted: false
      isActive: true
    ){
    _id
    description
    isDeleted
    isActive
  }
}

Hobbies - update hobby - NB click twise
============================================================================================================

mutation{
  updateHobby(
    hobbyId: "5d91c75871542448fc9248c4",
    description: "Writings",
    isDeleted:false,
    isActive: true
  ){
    _id
    description
    isDeleted
    isActive
  }
}


Hobbies - get hobby by _id
============================================================================================================

query {
  getHobbyById(hobbyId: "5d8b14fc90a3a314a0f0a4e5"){
    _id
    description 
    isDeleted 
    isActive
  }
}


Hobbies - get all hobbies
============================================================================================================

 query {
  getAllHobbies{
    _id
    description
    isDeleted
    isActive
  }
}

Hobbies - delete hobby by _id
============================================================================================================

mutation{
  deleteHobby(
    hobbyId: "5d91c5da39a94d303cfe10f0"
  ){
    _id
  }
}



const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
app.get('/', (req, res) => {
    res.send(process.env.SECRET_KEY);
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

{
"SECRET_KEY": "mysecretkey",
"PORT": 4800,
"SALT": 10,
"TOKEN_EXPIRATION": "1m"

//1h 10s
}