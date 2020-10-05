const User = require("../models/auth");
const dashboard = (req, res) => {
    User.find().then( result => {          
        res.render("list", {data : result});
    }).catch(err => {
        if (err) {
            res.render("list", {err : err});          
        }
    });     
}

// Fetch record by id
const edit = (req, res) => {
    console.log(req.params);
    id = req.params.id;
    User.find({_id : id}).then( result => {        
        res.render("edituser", {data : result[0]});
    }).catch(err => {
        if (err) {
            res.render("edituser", {err : err});
        }
    });
}

// Update user details
const update = (req, res) => {
    let userId = req.body.userId;     
    User.findByIdAndUpdate(userId, {
        name : req.body.name,    
        email : req.body.email  
    }, {new: true}).then(user => {
        if (!user) {
            req.flash('error', 'User not found.');                                
        }
        
        req.flash('success', 'User Details Successfully Updated.');
        res.redirect('/dashboard');      
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            req.flash('error', 'User not found.');            
        }
        
        req.flash('error', 'Error updating user with id ' + userId);
        res.redirect('/dashboard');                
    });
}

// delete user
const deleteUser = (req, res) => {
    let userId = req.params.id;   
    User.findByIdAndRemove(userId, {useNewUrlParser: true}).then(user => {
        if (!user) {
            req.flash('error', 'User not found.');            
        }

        req.flash('success', 'User deleted Successfully!');
        res.redirect('/dashboard');
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            req.flash('error', 'User not found.' + userId);                      
        }

        req.flash('error', 'Could not delete user with id ' + userId);
        res.redirect('/dashboard');
    });
}

module.exports = {
    dashboard,
    edit,
    update,
    deleteUser
}