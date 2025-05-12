import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $product_id: String!
    $product_name: String!
    $selected_attributes: [AttributeInput!]!
    $unit_price: Float!
    $quantity: Int!
    $total_price: Float!
  ) {
    createOrder(
      product_id: $product_id
      product_name: $product_name
      selected_attributes: $selected_attributes
      unit_price: $unit_price
      quantity: $quantity
      total_price: $total_price
    )
  }
`;
