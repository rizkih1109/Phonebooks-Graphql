const User = require('../models/Users')
const path = require('path')
const fs = require('fs')

const getUsers = async ({ keyword = '', page = 1, limit = 10, sortBy = '_id', sortMode = 'asc' }) => {
    const offset = (page - 1) * limit

    const sort = {}
    sort[sortBy] = sortMode

    const params = {
        $or: [
            { name: new RegExp(keyword, 'i') },
            { phone: new RegExp(keyword, 'i') },
        ]
    }

    const total = await User.countDocuments(params)
    const pages = Math.ceil(total / limit)
    const phonebooks = await User.find(params).sort(sort).limit(limit).skip(offset)

    return { phonebooks, page, limit, pages, total }
}

const createUser = (input) => User.create(input)

const updateUser = (id, input) => User.findByIdAndUpdate(id, input, { new: true })

const deleteUser = async (id) => {
    const user = await User.findById(id)
    const file = user.avatar

    if (file !== null) {
        const filePath = path.resolve(__dirname, '../public/images/', file);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                console.log(err)
            })
        }
    }
    
    return await User.findByIdAndDelete(id)
}

module.exports = { getUsers, createUser, updateUser, deleteUser }