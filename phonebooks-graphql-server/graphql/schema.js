const { buildSchema } = require('graphql')
const User = require('../models/Users')
const { getUsers, createUser, updateUser, deleteUser } = require('../services/users')

const schema = buildSchema(`

    type User {
        _id: ID!
        name: String
        phone: String
        avatar: String
    }

    type Users {
        phonebooks: [User]
        page: Int
        limit: Int
        pages: Int
        total: Int
    }

    input UserInput {
        name: String
        phone: String
    }

    type Query {
        getUsers(page: Int, keyword: String, sortBy: String, sortMode: String): Users
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): User
    }
`)

const solution = {
    getUsers: ({ keyword = '', page = 1, limit = 10, sortBy = '_id', sortMode = 'asc' }) => getUsers({ page, limit, keyword, sortBy, sortMode }),

    createUser: ({ input }) => createUser(input),

    updateUser: ({ id, input }) => updateUser(id, input),

    deleteUser: ({ id }) => deleteUser(id)
}

module.exports = { schema, solution }