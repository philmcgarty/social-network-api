# social-network-api

Week 18 Challenge - NoSQL Database

## Description

A backend server that can be used for a social media database. Built using Node.js, MongoDB, with Mongoose, and Express.js packages.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Links](#links)


---
## Installation

**To start the server**

To install all dependencies, run the following at project root in bash terminal:
*"npm i"*

In bash terminal at project root directory run: 
*"npm start"*


---
## Usage

This is currently only a back-end, and can therefore only be used for testing purposes until a front-end is added.

On starting the server the user can test the endpoints using Insomnia, as demonstrated in the video link below.

The API uses the following endpoints:

* /api/users - To add a new user, find all users
* /api/users/:id - To find one user byv id, delete a user, update a user
* /api/users/:userId/friends/:friendId - To add a friend to a user, or to delete a friend
* /api/thoughts - Add a new thought, find all thoughts
* /api/thoughts/:id - Find one thought, update thought, delete thought
* /api/thoughts/:thoughtId/reactions - post a new reaction to a thought
* /api/thoughts/:thoughtId/reactions/:reactionId - delete a reaction

---
## Tests

Video demo of endpoint tests

[Social Media API backend demo video](https://drive.google.com/file/d/1NXKCfDa1jUMmxyPH9LaOgrXGOeqxp-g_/view)


---
## Links

[Social Media API on GitHub](https://github.com/philmcgarty/social-network-api)
