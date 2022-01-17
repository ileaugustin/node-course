const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "augustin"
    });
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "pista"
    });
})

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "pista",
        message: "heeeeeeeeeeeeeeeeeeeelp"
    });
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide address"
        })
        return;
    }

    geocode(req.query.address, (error, { long, lat, location } = {}) => {
        if (error) {
            res.send({
                error
            })
            return;
        }

        forecast(long, lat, (error, forecastData) => {
            if (error) {
                res.send({
                    error
                })
                return;
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "You must provide search term"
        })
        return;
    }
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: "Oops...",
        name: "moi",
        message: "Help page not found"
    });
})

app.get("*", (req, res) => {
    res.render('404', {
        title: "Oops...",
        name: "moi",
        message: "Page not found"
    });
})

app.listen(3000, () => {
    console.log("Server is up, on port 3000.")
})