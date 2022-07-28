import React from "react";
import { gql, useQuery } from "@apollo/client";

const PRODUCTS = gql`
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

function App() {
  const { loading, error, data } = useQuery(PRODUCTS);
  console.log(data)
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
