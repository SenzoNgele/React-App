const mongoose = require('mongoose');

const hobbiesSchema = mongoose.Schema({
    description: 
    {
        type: String, 
        required: true, 
        max: 120
    },
    isDeleted: 
    {
        type: Boolean, 
        required: true, 
        default: false
    },
    isActive: 
    {
        type: Boolean, 
        required: true, 
        default: true
    }
}, {collection: 'Hobbies'});

module.exports = mongoose.model('Hobbies', hobbiesSchema);
