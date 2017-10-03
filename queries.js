//I left bluebird here because it might be useful in case
//I want to use transactions
//var promise = require('bluebird');

var knex = require('./src/server/db/knex');

//Return all puppies
function getAllPuppies(req, res, next) {
  knex('pups').select('*')
    .then(function(pups) {
      res.status(200)
        .json({
          status: 'success',
          data: pups,
          messge: 'Retrieved ALL puppies'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

//Get a single puppy
function getSinglePuppy(req, res, next) {
  //Parse the integer value.
  var puppyId = parseInt(req.params.id);

  knex('pups').where('id', puppyId)
    .then(function(pups) {
      res.status(200)
        .json({
          status: 'success',
          data: pups,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function(err){
      return next(err);
    });
}

//Create a new puppy
function createPuppy(req, res, next) {
  //Parse the interger value
  req.body.age = parseInt(req.body.age);
  knex('pups').insert({
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        sex: req.body.sex
      })
      .then(function(pups) {
        res.status(200)
          .json({
            status: 'success',
            message: 'Added one puppy'
          });
      })
      .catch(function(err) {
        return next(err);
      });
}

//Update a puppy
function updatePuppy(req, res, next) {
  knex('pups').where('id', req.params.id).update({
        name: req.body.name,
        breed: req.body.breed,
        age: parseInt(req.body.age),
        sex: req.body.sex
      })
      .then(function(pups) {
        res.status(200)
          .json({
            status: 'success',
            message: 'Puppy data updated!'
          });
      })
      .catch(function(err) {
        return next(err);
      });
}

//Delete a puppy
function removePuppy(req, res, next) {
  //Parse the integer value
  var puppyId = parseInt(req.params.id);
  knex('pups').where('id', puppyId).del()
    .then(function(affectedRows) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ' + affectedRows + ' puppy'
        });

    })
    .catch(function(err) {
      return next(err);
    });
}


// Making our future functions available to the app
module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};
