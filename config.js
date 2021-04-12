/////////////////////
//config.js
////////////////////

const env = process.env;

const dbsettigs = {
  db: {
    user: env.DB_USER || 'personapp',
    host: env.DB_HOST || 'localhost',
    database: env.DB_NAME || 'persondb',
    password: env.DB_PASSWORD || 'myw21pw',
    port: env.DB_PORT || 5432,
  },
  dblist: env.LIST_PER_PAGE || 15,
};

module.exports = dbsettigs;
