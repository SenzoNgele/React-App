const { gql } = require("apollo-server-express");

// types is what we returns
const typeDefs = gql`
  type Address {
    _id: ID!
    address1: String!
    address2: String!
    address3: String!
    isDeleted: Boolean!
    isActive: Boolean!
  }

  type Hobbies {
    _id: ID!
    description: String!
    isDeleted: Boolean!
    isActive: Boolean!
  }

  type Person {
    _id: ID!
    name: String!
    surname: String!
    age: Int!
    gender: String!
    address: Address!
    hobbies: [Hobbies]!
    isDeleted: Boolean!
    isActive: Boolean!
  }

  type Roles {
    _id: ID!
    description: String!
    isDeleted: Boolean!
    isActive: Boolean!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    role: [Roles]!
    isDeleted: Boolean!
    isActive: Boolean!
  }

  type UserData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    # ***** Person query *****
    getAllPeople: [Person!]!
    getPersonById(personId: ID!): Person!
    # ***** End of Person query *****

    # ***** Hobbies query ********
    getAllHobbies: [Hobbies]!
    getHobbyById(hobbyId: ID!): Hobbies!
    # ***** End of hobbies query ********

    # ***** Address query ********
    #getAllAddress: [Address]!
    #getAddressById(addressId: ID!): Address!
    # ***** End of Address query ********

    # ***** User query *****
    getAllUsers: [User!]!
    getUserById(userId: ID!): User!
    # ***** End of User query *****

    # ***** Role query *****
    getAllRoles: [Roles!]!
    getRoleById(roleId: ID!): Roles!
    # ***** End of Role query *****
  }

  type Mutation {
    # ***** Person mutation *****
    createPersons(
      #   Text: String!
      #   Success: Boolean!
      name: String!
      surname: String!
      age: Int!
      gender: String!
      address1: String!
      address2: String!
      address3: String!
      hobbies: [ID!]!
      isDeleted: Boolean
      isActive: Boolean
    ): Person!
    # ***** End of Person mutation *****

    # ***** Update Person mutation *****
    updatePerson(
      personId: ID!
      name: String
      surname: String
      age: Int
      gender: String
      address1: String
      address2: String
      address3: String
      hobbies: [ID]
      isDeleted: Boolean
      isActive: Boolean
    ): Person!
    # ***** End of update Person mutation *****

    # ***** Delete Person mutation *****
    deletePerson(personId: ID!): Person!
    # ***** End of Delete Person mutation *****

    # ***** Hobby mutation *****
    createHobby(
      description: String!
      isDeleted: Boolean!
      isActive: Boolean!
    ): Hobbies!
    # ***** End of Hobby mutation *****

    # ***** Update Hobby mutation *****
    updateHobby(
      hobbyId: ID!
      description: String!
      isDeleted: Boolean!
      isActive: Boolean!
    ): Hobbies!
    # ***** End of update Hobby mutation *****

    # ***** Delete Hobby mutation *****
    deleteHobby(hobbyId: ID!): Hobbies!
    # ***** End of Delete Hobby mutation *****

    # ***** Update Hobby mutation *****
    updateAddress(
      addressId: ID!
      address1: String!
      address2: String!
      address3: String!
    ): Address!
    # ***** End of update address mutation *****

    # ***** User mutation *****
    createUser(
      email: String!
      password: String!
      role: [ID!]!
      isDeleted: Boolean!
      isActive: Boolean!
    ): User!
    # ***** End of User mutation *****

    # ***** Update User mutation *****
    updateUser(
      userId: ID!
      description: String!
      isDeleted: Boolean!
      isActive: Boolean!
    ): User!
    # ***** End of update User mutation *****

    # ***** Delete User mutation *****
    deleteUser(userId: ID!): User!
    # ***** End of Delete User mutation *****

    # ***** Role mutation *****
    createRole(
      description: String!
      isDeleted: Boolean!
      isActive: Boolean!
    ): Roles!
    # ***** End of Role mutation *****

    # ***** Update Role mutation *****
    updateRole(
      roleId: ID!
      description: String!
      isDeleted: Boolean!
      isActive: Boolean!
    ): Roles!
    # ***** End of update Role mutation *****

    # ***** Delete User mutation *****
    deleteRole(roleId: ID!): Roles!
    # ***** End of Delete Role mutation *****

    # ***** Login mutation *****
    login(email: String!, password: String!): UserData!
    # ***** End of login mutation *****
  }
`;

module.exports = typeDefs;
/*

    softDeletePersonById(personId: ID!): crudPerson!
    activatePersonById(personId: ID!): crudPerson!
    deepDeletePersonById(personId: ID!): crudPerson!
    # ***** End of Person Mutation *****
}
*/
