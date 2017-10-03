var express = require('express');
var router = express.Router();

//To get access to our db functions
var db = require('../queries');

// Define the routes and map them to the DB functions
router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);

module.exports = router;
