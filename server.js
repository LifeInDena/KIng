var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views'); 
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');


var EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    date:String
})
mongoose.model("Event", EventSchema); 
var Event = mongoose.model('Event'); 

app.get("/admins", function(req, res) {
    all = Event.find({}, function(err, events) {
    res.render("event", { all: events });
    });
});
app.get("/EVENT", function(req, res) {
    all = Event.find({}, function(err, events) {
    res.render("party", { all: events });
    });
});

app.post('/ADDEVENT', function(req, res) {
    console.log("POST DATA", req.body);
    var party = new Event({ name: req.body.name, location: req.body.location, date: req.body.date });
    party.save();
    res.redirect('/admins');
})

app.get('/', function(request, response) {
    response.render('kingdom');
})

app.get('/Storm', function(request, response) {
    response.render('storm');
})

app.get('/admin', function(request, response) {
    response.render('log');
})

app.get("/MC-BLACK-JESUS", function (request, response){
    response.render('black');
})

app.get("/Taylor", function (request, response){
    response.render('taylor');
})
app.get("/Amanda", function (request, response){
    response.render('amanda');
})

app.get("/ASHES", function (request, response){
    response.render('ashes');
})
var hey = "RAMAR";
var how = "Rawboys";
app.post("/loggy", function (req, response){
    
    if (req.body.user == hey && req.body.password == how) {
        response.redirect("/admins");
        } else {
            response.render('log');
        }
})

app.get("/CONTACT", function (request, response){
    response.render('contact');
})

app.get("/FOUNDER", function (request, response){
    response.render('founder');
})
app.get("/event/:id", function(req, res) {
    Event.find({_id: req.params.id,}, function(err, events) {
        res.render("show", { event: events });
    });
});
app.post("/edit/:id", function(req, res) {
    Event.findOne({ _id: req.params.id }, function(err, events){
    events.name = req.body.name;
    events.location = req.body.location;
    events.date = req.body.date;
    events.save(function(err){
        res.redirect("/EVENT");
    });
});
});

app.post("/destroy/:id", function(req, res) {
    Event.remove({ _id: req.params.id }, function(err){
    res.redirect("/admins");
    });
});

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(process.env.PORT || 8000, function() {
    console.log("listening on port 8000");
})
