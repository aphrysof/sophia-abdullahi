import { gql } from "@apollo/client";

export const CARD_PRODUCTS = gql`
  query cardProducts {
    category {
      products {
        id
        name
        gallery
        inStock
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const PRODUCTS = gql`
  query getItems {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
