//--- User Defined Modules
const Person = require("./../../../modules/person.module");
const Address = require("./../../../modules/address.module");
const Hobbies = require("./../../../modules/hobbies.module");

const Queries = {
  getAllPeople: async (parent, args, context) => {
    try {
      /*
      // *************** Check if user has a role ******************
      if (!Array.isArray(context.user.roles)) {
        throw new ApolloError(
          `User not recognised, Please contact system Administrator`
        );
      }

      // --- Extract field _id from Roles ----
      const roleIds = context.user.roles.map(data => {
        return data._id;
      });

      // --- Extract field Description from Roles ----
      const roleDescriptions = context.user.roles.map(data => {
        return data.description;
      });

      // ***************** Amend permissions here ******************************
      if (
        context.user &&
        (roleDescriptions.includes("Super Administrator") ||
          roleDescriptions.includes("Administrator"))
      ) {
        // roleIds may also be utilised.
        // ====== Authenticated code here
*/
      const persons = await Person.find({});
      return persons;
      /*
        // ====== End of authenticated code
      } else {
        throw new ApolloError(
          "You need to be authenticated and granted permissions to access this request, Please contact your administrator!!"
        );
      }*/
    } catch (err) {
      throw err;
    }
  },

  getPersonById: async (parent, args) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorised");
    // }
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
  }
};

const Mutations = {
  createPersons: async (parent, args) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorised");
    // }
    try {
      const hobby = await Hobbies.find({ _id: args.hobbies });
      const address = new Address({
        address1: args.address1,
        address2: args.address2,
        address3: args.address3
      });
      const newAddress = await address.save();

      let person = new Person({
        name: args.name,
        surname: args.surname,
        age: args.age,
        gender: args.gender,
        address: newAddress,
        hobbies: hobby
        // isDeleted: args.isDeleted,
        // isActive: args.isActive
      });
      const newPerson = await person.save();
      return newPerson;
    } catch (err) {
      throw err;
    }
  },

  updatePerson: async (parent, args) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorised");
    // }
    try {
      const hobby = await Hobbies.find({ _id: args.hobbies });
      const personData = await Person.findByIdAndUpdate({ _id: args.personId });

      const updatedAddress = await Address.findByIdAndUpdate(
        personData.address._id,
        {
          address1: args.address1,
          address2: args.address2,
          address3: args.address3
        }
      );

      const person = await Person.findByIdAndUpdate(args.personId, {
        name: args.name,
        surname: args.surname,
        age: args.age,
        gender: args.gender,
        address: updatedAddress,
        hobbies: hobby,
        isDeleted: args.isDeleted,
        isActive: args.isActive
      });
      const updatePerson = await person.save();
      return updatePerson;
    } catch (err) {
      throw err;
    }
  },

  deletePerson: async (parent, args) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorised");
    // }
    try {
      //console.log(args.personId);
      const addressId = await Person.findOne({ _id: args.addressId });

      const deletedPerson = await Person.findByIdAndDelete(args.personId);
      const addressData = await Address.findByIdAndDelete(
        deletedPerson.address._id
      );
      //return deletedPerson;
      return {
        _id: deletedPerson._id,
        name: deletedPerson.name,
        surname: deletedPerson.surname,
        age: deletedPerson.age,
        gender: deletedPerson.gender,
        address: addressData,
        hobbies: deletedPerson.hobbies,
        isDeleted: deletedPerson.isDeleted,
        isActive: deletedPerson.isActive
      };
    } catch (err) {
      throw err;
    }
  }
};

module.exports.personQuery = Queries;
module.exports.personMutation = Mutations;
