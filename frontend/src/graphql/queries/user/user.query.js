import { gql } from "apollo-boost";

//*********BEGINNING OF USER QUERY*********//
// const login = gql`
//   {
//     login {
//       userId
//       token
//       tokenExpiration
//     }
//   }
// `;
//*********END OF USER QUERY*********//
const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export { login };

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
