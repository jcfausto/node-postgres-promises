var promise = require('bluebird');

var options = {
  //Overriding default promise lib (ES6 promise) with bluebird
  promiseLib: promise
};

//pg-promise instance
var pgp = require('pg-promise')(options);

//Glocal connection instance
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);

// DB Query functions that will be used by the router

//Return all puppies
function getAllPuppies(req, res, next) {
  db.any('select * from pups')
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
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

  db.one('select * from pups where id = $1', puppyId)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
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
  db.none('insert into pups(name, breed, age, sex)' +
        'values (${name}, ${breed}, ${age}, ${sex})', req.body)
      .then(function(data) {
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
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age), req.body.sex,
    parseInt(req.params.id)])
      .then(function(data) {
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
  db.result('delete from pups where id=$1', puppyId)
    .then(function(result) {

      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
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
