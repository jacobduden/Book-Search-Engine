const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    bookCount: INT
    savedBooks: [Book]
}

type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

Type bookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Query {
    me: User
}

type Auth {
Token: ID!
user: User
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    saveBook(input: bookInput): User
    removeBook(bookId: String!): User
}
`