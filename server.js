require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")

const app = express()
const PORT = process.env.PORT 

const pokemon = require("./models/pokemon")

app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static", express.static("public"))
app.use("/public", express.static("public"))

//  Home page
app.get("/", (req, res) => res.redirect("/pokemon"))

// Index Route
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {
        allPokemon: pokemon
    })   
})

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})