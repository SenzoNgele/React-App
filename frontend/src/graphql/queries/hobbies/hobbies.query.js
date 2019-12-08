import { gql } from "apollo-boost";

//*********BEGINNING OF HOBBIES QUERY*********//
const getAllHobbies = gql`
  {
    getAllHobbies{
      _id
      description
      isDeleted
      isActive
    }
  }
`;

const getHobbyById = gql`
  {
    getHobbyById(hobbyId: "5d8b14fc90a3a314a0f0a4e5"){
      _id
      description 
      isDeleted 
      isActive
    }
  }
`;

//*********END OF PERSON QUERY*********//

export { getAllHobbies, getHobbyById };
