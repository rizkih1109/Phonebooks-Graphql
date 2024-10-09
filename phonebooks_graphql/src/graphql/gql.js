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