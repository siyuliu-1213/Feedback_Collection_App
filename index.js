const express = require("express"); // common js module 
// to import express by using require keyword
// import express from 'express'; 
// yes 2015 module and node won't support easily
const app = express(); // a new app

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

// environment variable
// figure out what Heroku provides
// or when running on our machine, listen to 5000
const PORT = process.env.PORT || 5000; 
app.listen(PORT);
