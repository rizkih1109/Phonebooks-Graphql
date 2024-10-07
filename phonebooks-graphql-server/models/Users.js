const { Schema, model } = require('mongoose')

const PhonebookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = model('Phonebook', PhonebookSchema);

