const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Student {
    id: ID
    name: String
    age: Int
    class: Class
  }

  type Class {
    id: ID
    name: String
    students: [Student]
  }

  #ROOT TYPE
  type Query {
    students: [Student]
    student(id: ID!): Student
    classes: [Class]
    class(id: ID!): Class
  }

  type Mutation {
    createStudent(name: String, age: Int, classId: ID): Student
    createClass(name: String!): Class
  }
`;

module.exports = typeDefs;
