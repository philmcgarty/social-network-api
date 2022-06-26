const { User, Thought } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThought(req, res){
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },


    // needs fixing!!!!!
    // create a new thought
    createThought({ body }, res){
        Thought.create(body)
        .then(dbThoughtData => {
            if(!dbThoughtData){
                console.log(err)
            }
            return User.findOneAndUpdate(
                { userName: body.userName },
                { $push: { thoughts: body._id}},
                { new: true}
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(400).json({ message: 'No user with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(400).json({ message: 'No thought with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // delete a thought by its id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(400).json({ message: 'No thought with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // /api/thoughts/:thoughtId/reactions
    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(400).json({ message: 'No thought with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // delete a reaction
    deleteReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }

}

module.exports = thoughtController;