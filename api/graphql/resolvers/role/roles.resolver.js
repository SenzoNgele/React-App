//--- User Defined Modules
const Roles = require("./../../../modules/roles.module");

const Queries = {
  getAllRoles: async (parent, args) => {
    try {
      const role = await Roles.find({});
      return role;
    } catch (err) {
      throw err;
    }
  },

  getRoleById: async (parent, args) => {
    try {
      const role = await Roles.findById(args.roleId);
      return role;
    } catch (err) {
      throw err;
    }
  }
};

const Mutations = {
  createRole: async (parent, args) => {
    try {
      const role = new Roles({
        description: args.description,
        isDeleted: args.isDeleted,
        isActive: args.isActive
      });
      const newRole = await role.save();
      return newRole;
    } catch (err) {
      throw err;
    }
  },

  updateRole: async (parent, args) => {
    try {
      const role = await Roles.findByIdAndUpdate(args.roleId, {
        //$set: {
        description: args.description,
        isDeleted: args.isDeleted,
        isActive: args.isActive
        //}
      });
      const updatedRole = await role.save();
      return {
        messege: "Role successfull updated!",
        _id: updatedRole._id,
        description: updatedRole.description,
        isDeleted: updatedRole.isDeleted,
        isActive: updatedRole.isActive
      };
    } catch (err) {
      throw err;
    }
  },

  deleteRole: async (parent, args) => {
    try {
      const deletedRole = await Roles.findByIdAndDelete(args.roleId);
      return {
        messege: "Role successfull deleted!",
        _id: deletedRole._id,
        description: deletedRole.description,
        isDeleted: deletedRole.isDeleted,
        isActive: deletedRole.isActive
      };
    } catch (err) {
      throw err;
    }
  }
};

module.exports.roleQuery = Queries;
module.exports.roleMutation = Mutations;
