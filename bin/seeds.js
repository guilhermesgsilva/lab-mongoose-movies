require("../db");
const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");

const celebrities = [
    { name: "Michael Jordan", occupation: "Sportsperson", catchPhrase: "Talent wins games, but teamwork and intelligence wins championships." },
    { name: "Oprah Winfrey", occupation: "Television personality", catchPhrase: "You can have it all. Just not all at once." },
    { name: "Leonardo DiCaprio", occupation: "Actor", catchPhrase: "Kill them with success and bury them with a smile." },
    { name: "Jerry Seinfeld", occupation: "Comedian", catchPhrase: "Shut Up, You Old Bag!" },
];

async function startDatabase() {
    try {
        await Celebrity.deleteMany();
        await Celebrity.insertMany(celebrities)
        console.log(`celebrities created - ${celebrities.length}`)
    } catch (e) {
        console.log("error occurred", e);
    } finally {
        mongoose.connection.close();
    }
};

startDatabase();

// { name: "Steven Spielberg", occupation: "Filmmaker", catchPhrase: "Whether in success or in failure, I’m proud of every single movie I’ve directed." },
