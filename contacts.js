var express = require ('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://okcoders:okcoders@okcoders.co/diana');

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Server listening at http://localhost:' +port);
});

var Contact = require('./models/Contact');

app.get('/contacts', function(req, res){
    Contact.find().exec().then(function(contacts){
        res.json(contacts);
    });
});

app.post('/contacts', function(req, res){
    var contact = req.body;
    if(contact._id){
        console.log('POST /contacts update ID= ' + contact._id);
        Contact.findOneAndUpdate({_id:contact._id}, contact).exec().then(function(){
            console.log('findOneAndUpdate complete.');
            res.json(true);
        });
    } else {
        console.log('POST /contacts: ', req.body);
        var editContact = new Contact(req.body);
        editContact.save().then(function(){
            res.json(true);
        });
    }; 
});

app.delete('/contacts/:id', function(req, res){
    var id = req.params.id;
    Contact.findOneAndRemove({_id:id}).exec().then(function(){
        res.json(true);
    });
});