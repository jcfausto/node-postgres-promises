
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pups', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('breed').notNullable();
    table.integer('age').notNullable();
    table.string('sex').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pups');
};
