const { buildSchema } = require('graphql')
const User = require('../models/Users')

const schema = buildSchema(`

    type User {
        _id: ID!
        name: String
        phone: String
        avatar: String
    }

    input UserInput {
        name: String
        phone: String
    }

    type Query {
        getUsers(page: Int, name: String, phone: String, sortBy: String, sortMode: String): [User]
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): User
    }
`)

const solution = {
    getUsers: ({ name, phone, page = 1, sortBy = '_id', sortMode = 'asc' }) => {
        const limit = 10
        const offset = (page - 1) * limit
        const sort = {}
        sort[sortBy] = sortMode

        const params = {
            ...(name && {name: new RegExp(name, 'i')}),
            ...(phone && {phone: new RegExp(phone, 'i')}),
        }

        return User.find(params).sort(sort).limit(limit).skip(offset)
    },

    createUser: ({ input }) => User.create(input),
    updateUser: ({ id, input }) => User.findByIdAndUpdate(id, input, { new: true }),
    deleteUser: ({ id }) => User.findByIdAndDelete(id)
}

module.exports = { schema, solution }