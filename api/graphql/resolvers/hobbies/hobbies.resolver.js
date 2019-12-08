//--- User Defined Modules
const Hobbies = require("./../../../modules/hobbies.module");

const Queries = {
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
};

const Mutations = {
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
};

module.exports.hobbiesQuery = Queries;
module.exports.hobbiesMutation = Mutations;