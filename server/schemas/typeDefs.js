const { gql } = require('apollo-server-express');

const typeDefs = gql `

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: String
    size: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
  
type Job {
  _id:ID
  lastupStringd: String
  orderId: ID
  priority: Int   
  status: String
  quantity: Int
  commitTime: String
}

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }
  type Category {
    _id: ID
    name: String
  }

type Kitchen {
  _id: ID
  date: String
  queue: [Job]
}

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products: [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {

    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    deleteOrder(_id:ID!) : Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    # addordertoKitchen(order:Order!):Kitchen

  }
`;

module.exports = typeDefs;
