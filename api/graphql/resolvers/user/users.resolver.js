//--- User Defined Modules
const User = require("./../../../modules/users.module");
const Roles = require("./../../../modules/roles.module");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Queries = {
  getAllUsers: async (parent, args) => {
    try {
      const users = await User.find({});
      if (!users) throw new Error("No users found");
      return users;
    } catch (err) {
      throw err;
    }
  },

  getUserById: async (parent, args) => {
    try {
      const user = await User.findById(args.userId);
      if (!user) throw new Error("User not found");
      return {
        _id: user._id,
        email: user.email,
        password: user.password,
        role: user.role,
        isDeleted: user.isDeleted,
        isActive: user.isActive
      };
    } catch (err) {
      throw err;
    }
  }
};

const Mutations = {
  createUser: async (parent, args) => {
    try {
      const findUser = await User.findOne({ email: args.email });
      if (findUser) throw new Error("User with that username exist!");

      //const roles = await Roles.find({_id: {$in: args.roleId}});
      const role = await Roles.find({ _id: args.role });
      if (!role) throw new Error("No roles found");
      // We await the result of the hash function
      const hashedpassword = await bcrypt.hash(args.password, 12); // process.env.SALT
      if (!hashedpassword) throw new Error("Invalid Password");
      let user = new User({
        email: args.email,
        password: hashedpassword,
        role: role
      });
      const newUser = await user.save();
      return {
        messege: "User successful created!!",
        _id: newUser._id,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        isDeleted: newUser.isDeleted,
        isActive: newUser.isActive
      };
    } catch (err) {
      throw err;
    }
  },

  updateUser: async (parent, args) => {
    try {
      const role = await Roles.find({ _id: args.role });
      if (!role) throw new Error("Can not find user");

      //await Person.findByIdAndUpdate({ _id: args.personId }
      const user = await User.findByIdAndUpdate(args.userId, {
        email: args.email,
        password: args.password,
        role: role,
        isDeleted: args.isDeleted,
        isActive: args.isActive
      });
      const updateUser = await user.save();
      return {
        messege: "Successful Updated!",
        _id: updateUser._id,
        email: updateUser.email,
        password: updateUser.password,
        role: args.role,
        isDeleted: updateUser.isDeleted,
        isActive: updateUser.isActive
      };
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (parent, args) => {
    try {
      console.log(args.userId);
      const deletedUser = await Person.findByIdAndDelete(args.userId);
      if (!deletedUser) throw new Error("Can not find the user");

      return {
        _id: deletedUser._id,
        email: deletedUser.name,
        password: deletedUser.surname,
        role: deletedUser.role,
        isDeleted: deletedUser.isDeleted,
        isActive: deletedUser.isActive
      };
    } catch (err) {
      throw err;
    }
  },

  login: async (parent, args) => {
    try {
      const user = await User.findOne({ email: args.email });
      if (!user) throw new Error("User does not exist!");

      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) throw new Error("Password is incorrect");

      //arguments(1,2,3)
      //1 data want to put on the token, 2 string required to hash paasword 3 Optional expiry ket
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "mysecretkey",
        { expiresIn: "1h" }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  }
};

module.exports.userQuery = Queries;
module.exports.userMutation = Mutations;
