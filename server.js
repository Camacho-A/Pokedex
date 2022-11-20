require("dotenv").config()
const express = require("express")
const pokemons = require("./models/pokemon")
const morgan = require("morgan")
const methodOverride = require("method-override")
const PORT = process.env.PORT 

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static", express.static("public"))
app.use("/public", express.static("public"))



//  Home page
app.get("/", (req, res) => res.redirect("/pokemon"))

// Index Route to return all pokemon
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {
        allPokemon: pokemons
    })   
})

// New Route 
app.get("/pokemon/new", (req, res) => {
	res.render("new.ejs")
})

// Create Route
app.post("/pokemon", (req, res) => {
	pokemons.unshift(req.body)
	res.redirect("/pokemon")
})

// Edit Route
app.get("/pokemon/:id/edit", (req, res) => {
	res.render("edit.ejs", {
		pokemon: pokemons[req.params.id],
		index: req.params.id
	})
})

// Update Route
app.put("/pokemon/:id", (req, res) => {
	pokemons[req.params.id] = req.body
	res.redirect("/pokemon")
})

// Delete 
app.delete("/pokemon/:id", (req, res) => {
	// splice the item out of the array
	pokemons.splice(req.params.id, 1)
	// redirect user back to index
	res.redirect("/pokemon")
})


// Show Route
app.get("/pokemon/:id", (req, res) => {
	res.render("show.ejs", {
		pokemon: pokemons[req.params.id],
		index: req.params.id
	})
})




// Server Listening
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})