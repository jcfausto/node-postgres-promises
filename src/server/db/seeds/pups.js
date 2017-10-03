
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pups').del()
    .then(function () {
      // Inserts seed entries
      return knex('pups').insert([
        {id: 1, name: 'Rex', breed: 'Cool', age: 3, sex: 'M'},
        {id: 2, name: 'Blackie', breed: 'Beagle', age: 5, sex: 'F'},
        {id: 3, name: 'Godo', breed: 'Pincher', age: 4, sex: 'M'}
      ]);
    });
};
