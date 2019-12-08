import { gql } from "apollo-boost";

//*********BEGINNING OF PERSON QUERY*********//
const getAllPeople = gql`
  {
    getAllPeople {
      _id
      name
      age
      surname
      gender
      isDeleted
      isActive

      hobbies {
        _id
        description
        isDeleted
        isActive
      }

      address {
        _id
        address1
        address2
        address3
        isDeleted
        isActive
      }
    }
  }
`;

const getPersonById = gql`
  query getPersonById($personId: ID!) {
    getPersonById(personId: $personId) {
      _id
      name
      surname
      age
      gender
      address {
        _id
        address1
        address2
        address3
        isDeleted
        isActive
      }
      hobbies {
        _id
        description
        isDeleted
        isActive
      }
      isDeleted
      isActive
    }
  }
`;

const createPersons = gql`
  mutation createPersons(
    $name: String!
    $surname: String!
    $age: Int!
    $gender: String!
    $hobbies: [ID!]!
    $address1: String!
    $address2: String!
    $address3: String!
  ) #$isDeleted: Boolean!
  #$isActive: Boolean!
  {
    createPersons(
      name: $name
      surname: $surname
      age: $age
      gender: $gender
      hobbies: $hobbies
      address1: $address1
      address2: $address2
      address3: $address3
    ) {
      _id
      name
      surname
      age
      gender
      hobbies {
        _id
        description
        isDeleted
        isActive
      }
      address {
        address1
        address2
        address3
        isDeleted
        isActive
      }
    }
  }
`;

const updatePerson = gql`
  mutation updatePerson(
    $personId: ID!
    $name: String!
    $surname: String!
    $age: Int!
    $gender: String!
    $hobbies: [ID!]!
    $address1: String!
    $address2: String!
    $address3: String!
    $isDeleted: Boolean
    $isActive: Boolean
  ) {
    updatePerson(
      personId: $personId
      name: $name
      surname: $surname
      age: $age
      gender: $gender
      hobbies: $hobbies
      address1: $address1
      address2: $address2
      address3: $address3
      isDeleted: $isDeleted
      isActive: $isActive
    ) {
      _id
      name
      surname
      age
      gender
      hobbies {
        _id
        description
        isDeleted
        isActive
      }
      address {
        address1
        address2
        address3
        isDeleted
        isActive
      }
    }
  }
`;

const deletePerson = gql`
  mutation deletePerson($personId: ID!) {
    deletePerson(personId: $personId) {
      _id
      name
      surname
      age
      gender
      hobbies {
        _id
        description
        isDeleted
        isActive
      }
      address {
        address1
        address2
        address3
        isDeleted
        isActive
      }
    }
  }
`;
//*********END OF PERSON QUERY*********//

export {
  createPersons,
  updatePerson,
  getAllPeople,
  getPersonById,
  deletePerson
};

/*
const getPersonById = gql`
  {
    getPersonById(personId: "5d8b1ad790a3a314a0f0a4ec") {
      _id
      name
      surname
      age
      gender
      address {
        _id
        address1
        address2
        address3
        isDeleted
        isActive
      }
      hobbies {
        _id
        description
        isDeleted
        isActive
      }
      isDeleted
      isActive
    }
  }
`;

*/
