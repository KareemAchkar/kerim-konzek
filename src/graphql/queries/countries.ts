import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query {
    countries {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;