const { User } = require('../models');

const userController = {

    // get all users
    getAllUser(req, res){
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
            .populate({
                // need to update to add friends (use array?)
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(400).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(400).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // post friend to user list
    addFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId}},
            {new: true, runValidators: false}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete friend from user list
    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
};



module.exports = userController;