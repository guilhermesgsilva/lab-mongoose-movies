const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//http://localhost:3000/movies
router.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies);
        res.render("movies/movies-list", {movies});    
    } catch (e) {
        console.log("error occurred", e);
    }
});

//http://localhost:3000/movies/:movieId
router.get("/movies/:movieId", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId).populate("cast");
        res.render("movies/movie-detail", movie);    
    } catch (e) {
        console.log("error occurred", e);
    }
});

//http://localhost:3000/movies/create-movie
router.get("/create-movie", async (req, res) => {
    const movies = await Movie.find();
    const celebrities = await Celebrity.find();
    res.render("movies/movie-create", {movies, celebrities});
});

router.post("/create-movie", async (req, res) => {
    const {title, genre, plot, cast} = req.body;
    try {
        await Movie.create({title, genre, plot, cast});
        res.redirect("/movies");    
    } catch (e) {
        console.log("error occurred", e);
        res.redirect("movies/movie-create");
    }
});

//http://localhost:3000/movies/:movieId/edit
router.get("/movies/:movieId/edit", async (req, res) => {
    const movie = await Movie.findById(req.params.movieId);
    const celebrities = await Celebrity.find();
    res.render("movies/movie-edit", {movie, celebrities});
})

router.post("/movies/:movieId/edit", async (req, res) => {
    const {title, genre, plot, cast} = req.body;
    try {
        await Movie.findByIdAndUpdate(req.params.movieId, {
            title,
            genre,
            plot,
            cast,
        });
        res.redirect(`/movies/${req.params.movieId}`);    
    } catch (e) {
        console.log("error occurred", e);
        res.redirect("movies/movie-edit");
    }
});

router.post("/movies/:movieId/delete", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.movieId);
        res.redirect("/movies");    
    } catch (e) {
        console.log("error occurred", e);
    }
});

module.exports = router;