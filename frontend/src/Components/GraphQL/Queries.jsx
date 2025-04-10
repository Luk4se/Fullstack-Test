import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query {
    products {
    id
    name
    inStock
    description
    gallery
    category
    attributes {
      name
      items {
        displayValue
        value
        id
        __typename
      }
      name
      type
      __typename
    }
    prices {
        amount
        currency {
        label
        symbol
        __typename
      }
  }
  }
}
`;

export const GET_PRODUCT_BY_ID = gql`
  query ProductById($id: String!) {
    productById(id: $id) {
      id
      name
      description
      category
      brand
      inStock
      gallery
      prices {
        amount
        currency_label
      }
      attributes {
        name
        type
        attribute_id
        items {
          item_id
          displayValue
          value
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
      id
      name
      brand
      category
      inStock
      prices {
        amount
        currency_label
      }
      gallery
    }
  }
`;
