class AnimeDAO {
    constructor(database) {
      this._database = database;
    }
  
    findAll() {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM animes";
        this._database.all(query, (error, result) => {
          if (error)
            return reject("Não foi possivel recuperar os dados da tabela Animes");
          return resolve(result);
        });
      });
    }
  
    findOne(animeId) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM animes WHERE id = ?";
        this._database.get(query, animeId, (error, result) => {
          if (error) reject("Não foi possível recuperar o anime selecionado");
          return resolve(result);
        });
      });
    }
  
    create(anime) {
      return new Promise((resolve, reject) => {
        const query = `INSERT INTO animes (
        anime,
        estudio,
        diretor,
        ano_de_lancamento,
        genero
      ) VALUES (?,?,?,?,?)`;
        this._database.run(query, anime, (error, result) => {
          if (error) return reject(`Não foi possível adicionar o anime`);
          resolve({ message: "successo" });
        });
      });
    }
  
    update(anime) {
      return new Promise((resolve, reject) => {
        const query = `UPDATE animes SET
          anime = COALESCE(?, anime),
          estudio = COALESCE(?, estudio),
          diretor = COALESCE(?, diretor),
          ano_de_lancamento = COALESCE(?, ano_de_lancamento),
          genero = COALESCE(?, genero)
          WHERE id = ?
        `;
        this._database.run(query, anime, (error, result) => {
          if (error) return reject("Não foi possível atualizar o anime");
          resolve({ message: "banco atualizado com sucesso" });
        });
      });
    }
  
    delete(animeId) {
      return new Promise((resolve, reject) => {
        const query = "DELETE FROM animes WHERE id = ?";
        this._database.run(query, animeId, (error, result) => {
          if (error) reject("Não foi possível apagar o registro do anime");
          return resolve(result);
        });
      });
    }
  }
  
  module.exports = AnimeDAO;
  