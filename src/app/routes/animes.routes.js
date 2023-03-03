const animeController = require("../controllers/animeController");

const {
  getAllAnimes,
  findAnime,
  createAnime,
  updateAnime,
  removeAnime,
} = animeController;

module.exports = (app) => {
  app.get("/animes", getAllAnimes());
  app.get("/animes/:id", findAnime());
  app.post("/animes", createAnime());
  app.put("/animes/:id", updateAnime());
  app.delete("/animes/:id", removeAnime());
};
