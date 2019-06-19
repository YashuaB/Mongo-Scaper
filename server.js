var path = require("path");
var express = require("express");
var mongoose = require("mongoose");git
var exphbs = require("express-handlebars");
var app = express();

var PORT = process.env.PORT || 3000;





mongoose.connect("mongodb://localhost/mongotime", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

require("./routes/htmlRoutes")(app)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/error.html"));
});

// Listen on port 3000
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});