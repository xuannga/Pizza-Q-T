const { gql } = require('apollo-server-express');
const typeDefs = gql `

input PizzaOrder{
  _id:ID!
  quantity: Number!
  size: String!
  toppings: String!
  crust: String!
}
  type Order {
    _id: ID
    name: String
    phone: String
    pizzaorder:[PizzaOrder]
    date: Date
    requestime: Date
    commitTime: Date
    price: Number!
    status: String
  }

  input Profile {
    _id: ID
    name: String
    email: String
    password: String
    pastorders : [Order]
  }
  
  type Kitchen {
    _id: ID
    date: Date
    queue: [String]
    orders:[Order]
  }

  type History {
    _id: ID
    name: String
    officeHours: String
    officeLocation: String
    studentScore: Float
    classes: [Class]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    orders: [Order]   # provide orders in order
    kitchen: Kitchen  # provide the queue and delivery schedule
    history: History  # get reports on daily activity
    user: User      # user list, active, online
    order(id: ID!): Order  # fetch individual order
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(order: [ID]!): Order
    updateOrder(_id: ID!, order: Int!): Order
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;