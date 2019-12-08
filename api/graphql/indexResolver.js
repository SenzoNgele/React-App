//--- User Defined Modules
const {
  personMutation,
  personQuery
} = require("./resolvers/person/person.resolver");

const {
  hobbiesMutation,
  hobbiesQuery
} = require("./resolvers/hobbies/hobbies.resolver");

const { userMutation, userQuery } = require("./resolvers/user/users.resolver");

const { roleMutation, roleQuery } = require("./resolvers/role/roles.resolver");

const resolvers = {
  Query: {
    ...personQuery,
    ...hobbiesQuery,
    ...userQuery,
    ...roleQuery
  },

  Mutation: {
    ...personMutation,
    ...hobbiesMutation,
    ...userMutation,
    ...roleMutation
  }
};

module.exports = resolvers;
/*
//--- User Defined Modules
const Person = require("../modules/person.module");
const Address = require("../modules/address.module");
const Hobbies = require("../modules/hobbies.module");

const resolvers = {
  Query: {
    getAllPeople: async (parent, args) => {
      try {
        const persons = await Person.find({});
        return persons;
      } catch (err) {
        throw err;
      }
    },

    getPersonById: async (parent, args) => {
      try {
        const person = await Person.findById(args.personId);
        return {
          // Text: "This is my test",
          // Success: true,
          _id: person._id,
          name: person.name,
          surname: person.surname,
          age: person.age,
          gender: person.gender,
          address: person.address,
          hobbies: person.hobbies,
          isDeleted: person.isDeleted,
          isActive: person.isActive
        };
      } catch (err) {
        throw err;
      }
    },

    getAllHobbies: async (parent, args) => {
      try {
        const hobbies = await Hobbies.find({});
        return hobbies;
      } catch (err) {
        throw err;
      }
    },

    getHobbyById: async (parent, args) => {
      try {
        const hobby = await Hobbies.findById(args.hobbyId);
        return hobby;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    createPersons: async (parent, args) => {
      try {
        const hobby = await Hobbies.find({ _id: args.hobbies });
        const address = new Address({
          address1: args.address1,
          address2: args.address2,
          address3: args.address3,
          isDeleted: args.isDeleted,
          isActive: args.isActive
        });
        const newAddress = await address.save();

        let person = new Person({
          name: args.name,
          surname: args.surname,
          age: args.age,
          gender: args.gender,
          address: newAddress,
          hobbies: hobby,
          isDeleted: args.isDeleted,
          isActive: args.isActive
        });
        const newPerson = await person.save();
        return newPerson;
      } catch (err) {
        throw err;
      }
    },

    updatePerson: async (parent, args) => {
      try {
        const hobby = await Hobbies.find({ _id: args.hobbies });
        const personData = await Person.findByIdAndUpdate({_id: args.personId});
        const updatedAddress = await Address.findByIdAndUpdate(personData.address._id, {$set:{
          address1: args.address1,
          address2: args.address2,
          address3: args.address3
        }})

        const person = await Person.findByIdAndUpdate(args.personId, {$set:{
          name: args.name,
          surname: args.surname,
          age: args.age,
          gender: args.gender,
          Address: updatedAddress,
          hobbies: hobby,
          isDeleted: args.isDeleted,
          isActive: args.isActive
        }});
        const updatePerson = await person.save();
        return updatePerson;
      } catch (err) {
        throw err;
      }
    },

    deletePerson:  async (parent, args) => {
      try {
        const deletedPerson = await Person.findByIdAndDelete(args.personId)
        return deletedPerson;
      } catch (err) {
        throw err;
      }
    },

    createHobby: async (parent, args) => {
      try {
        const hobby = new Hobbies({
          description: args.description,
          isDeleted: args.isDeleted,
          isActive: args.isActive
        });
        const newHobby = await hobby.save();
        return newHobby;
      } catch (err) {
        throw err;
      }
    },

    updateHobby: async (parent, args) => {
      try {
        const hobby = await Hobbies.findByIdAndUpdate(args.hobbyId, {$set:{
          description: args.description,
          isDeleted: args.isDeleted,
          isActive: args.isActive
        }})
        const updatedHobby = await hobby.save();
        return updatedHobby;
      } catch (err) {
        throw err;
      }
    },

    deleteHobby:  async (parent, args) => {
      try {
        const deletedHobby = await Hobbies.findByIdAndDelete(args.hobbyId)
        return deletedHobby;
      } catch (err) {
        throw err;
      }
    },
  }
};

module.exports = resolvers;
*/
