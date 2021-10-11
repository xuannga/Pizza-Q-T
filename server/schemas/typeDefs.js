
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Order {
    _id: ID
    name: String
    phone: String
    pizzaorder: String,
    date: Date,
    requestime: Date
  }

  type Kitchen {
    _id: ID
    name: String
    building: String
    creditHours: Int
    professor: Professor
  }

  type History {
    _id: ID
    name: String
    officeHours: String
    officeLocation: String
    studentScore: Float
    classes: [Class]
  }

  type Query {
    orders: [Order]   # provide orders in order
    kitchen: Kitchen  # provide the queue and delivery schedule
    history: History  # get reports on daily activity
    user: User      # user list, active, online
    order(id: ID!): Order  # fetch individual order
  }

  # Define which mutations the client is allowed to make
  type Mutation {
    # Set the required fields for new schools
    addOrder(name: String!, phone: String!, pizzaorder: Int!, date: Date!,requestime: Date! ): Order
    closeOrder()   # complete order status
    updateOrder()  # change order, cancel , add quantity, ...
    updateKitchen() # queue updates as pizzas go in oven, out of oven
    acceptOrderfromKitchen() # respond to user on order acceptance
  }
`;

module.exports = typeDefs;
