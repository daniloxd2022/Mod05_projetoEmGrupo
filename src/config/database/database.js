const sqlite = require("sqlite3").verbose();
const DB_SOURCE = "src/config/database/database.sqlite";

const ANIMES = `
CREATE TABLE IF NOT EXISTS animes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anime TEXT,
  estudio TEXT,
  diretor TEXT,
  ano_de_lancamento TEXT,
  genero TEXT
  );
`;

const database = new sqlite.Database(DB_SOURCE, (err) => {
    if (err) {
      console.log(err);
    }
    database.run(ANIMES, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  
  module.exports = database;