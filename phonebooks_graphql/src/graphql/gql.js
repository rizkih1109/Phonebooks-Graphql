import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers($page: Int, $keyword: String, $sortBy: String, $sortMode: String) {
  getUsers(page: $page, keyword: $keyword , sortBy: $sortBy, sortMode: $sortMode) {
    phonebooks {
      _id
      name
      phone
      avatar
    }
    page
    limit
    pages
    total
  }
}
`;

export const ADD_USER = gql`
mutation createUser($input: UserInput){
  createUser(input: $input) {
    _id,
    name,
    phone
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: UserInput) {
  updateUser(id: $id, input: $input) {
    _id,
    name,
    phone
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    _id,
    name,
    phone,
    avatar
  }
}
`;
