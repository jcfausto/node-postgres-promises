module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/puppies_dev',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/puppies_testing',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'puppies',
      user:     'appdbuser',
      password: 'appdbuserpassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    }
  }

};
