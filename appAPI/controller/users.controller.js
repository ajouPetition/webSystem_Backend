const users = require("../models/users.model")

exports.findByID = function(req,res){
    users.findByID(req.params.userID, function(err,user){
        if(err) res.send(err)
        res.json(user)
    })
}

exports.create = function(req,res){
    users.create(req.query, function(err,user){
        if(err) res.send(err)
        res.json(user)
    })
}

exports.delete = function(req,res){
    users.delete(req.params.userID, function(err,user){
        if(err) res.send(err)
        res.json(user)
    })
}