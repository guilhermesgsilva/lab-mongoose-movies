const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// const Movie = require("../models/Movie.model");

//http://localhost:3000/celebrities
router.get("/celebrities", async (req, res) => {
    try {
        const celebrities = await Celebrity.find();
        console.log(celebrities);
        res.render("celebrities/celebrities-list", {celebrities});    
    } catch (e) {
        console.log("error occurred", e);
    }
});

//http://localhost:3000/celebrities/:celebrityId
router.get("/celebrities/:celebrityId", async (req, res) => {
    try {
        const celebrity = await Celebrity.findById(req.params.celebrityId);
        res.render("celebrities/celebrity-detail", celebrity);    
    } catch (e) {
        console.log("error occurred", e);
    }
});

//http://localhost:3000/celebrities/create-celebrity
router.get("/create-celebrity", async (req, res) => {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrity-create", {celebrities});
});

router.post("/create-celebrity", async (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    try {
        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect("/celebrities");    
    } catch (e) {
        console.log("error occurred", e);
        res.redirect("celebrities/celebrity-create");
    }
});

//http://localhost:3000/celebrities/:celebrityId/edit
router.get("/celebrities/:celebrityId/edit", async (req, res) => {
    const celebrity = await Celebrity.findById(req.params.celebrityId);
    res.render("celebrities/celebrity-edit", celebrity);
})

router.post("/celebrities/:celebrityId/edit", async (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    try {
        await Celebrity.findByIdAndUpdate(req.params.celebrityId, {
            name,
            occupation,
            catchPhrase,
        });
        res.redirect(`/celebrities/${req.params.celebrityId}`);    
    } catch (e) {
        console.log("error occurred", e);
        res.redirect("celebrities/celebrity-edit");
    }
});

router.post("/celebrities/:celebrityId/delete", async (req, res) => {
    try {
        await Celebrity.findByIdAndDelete(req.params.celebrityId);
        res.redirect("/celebrities");    
    } catch (e) {
        console.log("error occurred", e);
    }
});

module.exports = router;