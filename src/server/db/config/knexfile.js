const dbConfig = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASS: process.env.DATABASE_PASS
};

module.exports = {

  development: {
    client: 'postgresql',
    connection: dbConfig.DATABASE_URL+dbConfig.DATABASE_NAME+'_dev',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: dbConfig.DATABASE_URL+dbConfig.DATABASE_NAME+'_testing',
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
      database: dbConfig.DATABASE_NAME,
      user:     dbConfig.DATABASE_USER,
      password: dbConfig.DATABASE_PASS
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
