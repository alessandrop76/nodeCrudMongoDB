const Userdb = require('../model/model');

//retrive and return all users
exports.find = async (req, res) => {
    
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data =>{
            if(!data){
            res.status(400).send({message: `User with id: ${id}, not found`})
            }else{
                res.send(data)
            }        
        })
        .catch(err =>{
            res.status(500).send({message: err.message || 'User not found'})
        })
    }else{
        Userdb.find()
        .then(user =>{
           res.send(user)
        })
        .catch(err =>{
           res.status(500).send({message: err.message || 'Error Ocurred while retriving user information'})
        })
    }
}

// retrive and return a single user by params
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Userdb.findById({_id: id})
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || 'User not found'})
    })
}

//create and save new user
exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({message: 'Content can not be empty'});
        return;
    }
//new user
const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
})
//save user in the database
user
.save(user)
.then(data =>{
    res.redirect('/')
})
.catch(err =>{
    res.status(500).send({
        message: err.message || `Some error occurred while creatin a create operation`
    });
});
}

//update a new indendified user by user id
exports.update = (req, res) =>{
if(!req.body){
    return res
    .status(400)
    .send({ message: `Data to update can not be empty` })
}

const _id = req.params.id;

Userdb.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
.then(data =>{
    if(!data){
        res.status(404).send({ message: `Cannot Upadate user with ${_id}, Maybe user not found!`})
    }else{
        res.send(data);
    }
})
.catch(err =>{
    res.status(500).send({ message: `Error Update user information`})
})
}


//delete a user indentified by user idx
exports.delete = (req, res) =>{
const id = req.params.id;

Userdb.findByIdAndDelete(id)
.then(data =>{
    if(!data){
    res.status(400).send({ message: `Cannot Delete user with ${id}, Maybe user not exist`})
    }else{
        res.send({ message: ` User was successfully deleted` })
    }
})
.catch(error =>{
    res.status(500)
    .send({ message: `Cannot Delete user with id:  ${id} `})
})
}