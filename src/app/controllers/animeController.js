const database = require("../../config/database/database");

const AnimeDAO = require("../../config/DAO/AnimeDAO");
const { request } = require("express");
const animesDAO = new AnimeDAO(database);

class AnimeController {
  static getAllAnimes() {
    return (request, response) => {
      animesDAO
        .findAll()
        .then((rows) => {
          return response.send(rows);
        })
        .catch((error) => console.log(error));
    };
  }

  static findAnime() {
    return (request, response) => {
      const {
        params: { id: animeId },
      } = request;
      animesDAO
        .findOne([animeId])
        .then((row) => {
          return response.send([row]);
        })
        .catch((error) => console.log(error));
    };
  }

  static createAnime() {
    return (request, response) => {
      const errors = [];
      if (!request.body.anime) {
        errors.push("anime não informado");
      }

      if (!request.body.genero) {
        errors.push("genero não informado");
      }

      if (errors.length) {
        response.status(400).json({ error: errors.join(",") });
        return;
      }
      const {
        body: {
            anime,
            estudio,
            diretor,
            ano_de_lancamento,
            genero,
        },
      } = request;
      animesDAO
        .create([
            anime,
            estudio,
            diretor,
            ano_de_lancamento,
            genero,
        ])
        .then((result) => {
          return response.send(result);
        })
        .catch((error) => response.send(error));
    };
  }

  static removeAnime() {
    return (request, response) => {
      const {
        params: { id: animeId },
      } = request;
      animesDAO
        .delete([animeId])
        .then(() => {
          return response.send("Registro removido");
        })
        .catch((error) => console.log(error));
    };
  }

  static updateAnime() {
    return (request, response) => {
      const {
        body: {
            anime,
            estudio,
            diretor,
            ano_de_lancamento,
            genero,
        },
      } = request;
      const { id } = request.params;

      const animes = [
        anime,
        estudio,
        diretor,
        ano_de_lancamento,
        genero,
        id,
      ];
      animesDAO
        .update(animes)
        .then((result) => response.send(result))
        .catch((error) => console.log(error));
    };
  }
}

module.exports = AnimeController;
