const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Job {
    _id: ID
    orderId: ID
    lastupdated: String
    priority: Int
    quantity: Int
    commitTime: String
  }

  type Kitchen {
    _id: ID
    date: String
    queue: [Job]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input Kitchenorder{
    orderId: ID
    products:[ID]!
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    kitchens(_id: ID): Kitchen
  }

  type Mutation {
    addKitchen(date:String): Kitchen
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    # addOrderKitchen(kitchenorder: Kitchenorder! ): Kitchen
    updateKitchen(_id: ID!,orderId: ID, products: [ID]): Kitchen
  }
`;

module.exports = typeDefs;
