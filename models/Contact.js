var mongoose = require('mongoose');

var Contact = mongoose.model('contactY', {
    img: String,
    fname: String,
    lname: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    country: String,
    phone: String,
    email: String,
    category: String,
    notes: String
});

module.exports = Contact;