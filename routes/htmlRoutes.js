const axios = require("axios")
const cheerio = require("cheerio")
const db = require("../models")
const mongoose = require("mongoose")
var mc = mongoose.connection



module.exports = function (app) {



    app.get("/", function (req, res) {

        db.Article.find({ saved: false }, function (error, found) {

            if (error) {
                console.log(error)
                res.status(500).json(error)
            } else {

                res.status(200).render("index", { data: found })
            }
        })
    })

    app.get("/api/clear", function (req, res) {

        mc.dropCollection('articles', function (err, data) {

            mc.dropCollection('notes', function (err1, data1) {
                res.status(200).json("clear")
            })
        })
    })

    app.get("/api/headlines", function (req, res) {

        db.Article.find({ saved: req.query.saved }, function (error, found) {

            if (error) {
                console.log(error)
                res.status(500).json(error)
            } else {
                res.status(200).json(found)
            }
        })
    })

    app.get("/saved", function (req, res) {

        db.Article.find({ saved: true }, function (error, found) {

            if (error) {
                console.log(error)
                res.status(500).json(error)
            } else {
                res.status(200).render("saved", { data: found })
            }
        })
    })

    app.get("/api/notes/:id", function (req, res) {

        db.Article.findOne({ _id: req.params.id })
            .populate("notes")
            .then(function (found) {
                res.status(200).json(found.notes)
            })
            .catch(function (error) {
                console.log(error)
                res.status(500).json(error)
            })
    })

    app.delete("/api/notes/:id", function (req, res) {

        db.Article.findOneAndUpdate({ $pull: { notes: req.params.id } })
            .then(function (found) {
                db.Note.findByIdAndRemove({ _id: req.params.id },
                    function (error, data) {

                        if (error) {
                            console.log(error)
                            res.status(500).json(error)
                        } else {
                            res.status(200).json(data)
                        }
                    })

            }).catch(function (error) {
                console.log(error)
                res.status(500).json(error)
            })
    })

    app.delete("/api/headlines/:id", function (req, res) {

        db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { notes: [], saved: false } })
            .then(function (found) {
                res.status(200).json({ ok: true })
            }).catch(function (error) {
                console.log(error)
                res.status(500).json(error)
            })
    })

    app.post("/api/notes", function (req, res) {

        db.Note.create({ noteText: req.body.noteText.trim() })

            .then(function (dbNote) {

                return db.Article.findOneAndUpdate({ _id: req.body._headlineId }, { $push: { notes: dbNote._id } }, { new: true })
            })
            .then(function (found) {
                res.status(200).json(found)
            })
            .catch(function (error) {
                console.log(error)
                res.status(500).json(error)
            })
    })

    app.put("/api/headlines/:id", function (req, res) {

        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }).then(function (data) {
            res.status(200).json(data)
        }).catch(function (err) {
            res.status(500).json(err)
        })
    })

    app.get("/api/fetch", function (req, res) {

        axios.get("https://www.nytimes.com").then(function (response) {
            var $ = cheerio.load(response.data)
            var results = []

            $("article").each(function (i, element) {

                var title = $(element).children().find("h2").text().trim()
                var link = $(element).find("a").attr("href").trim()
                var summary = $(element).find("ul").find("li").text().trim()

                if (summary) {

                    results.push({
                        title: title,
                        link: "https://www.nytimes.com/" + link,
                        summary: summary,
                        type: "nyt"
                    })
                }
            })

            db.Article.create(results)
                .then(function (results) {
                    res.status(200).json(results)
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })
        }).catch(function (error) {
            console.log(error)
            res.status(500).json(error)
        })
    })

}
