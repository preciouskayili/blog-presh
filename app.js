const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Connect to mongodb
const dbURI =
	"mongodb+srv://preciouskayili:legendpresh@blog.co5v8.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(9090))
	.catch((error) => {
		console.log(error);
	});
// Register view engine
app.set("view engine", "ejs");

// Middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// Routes
app.get("/", (req, res) => {
	res.redirect("/blogs");
});
app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs/", blogRoutes);

// 404
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
