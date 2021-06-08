const express = require("express");
const path = require("path");
// route export module
const formatRoutes = require("./routes/format");
const formatSocketRoutes = require("./routes/formatSocket");
const handleImagesRoutes = require("./routes/handleImages");

// eslint-disable-next-line no-undef
const ENV = process.env;

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());

//*** START ROUTE API

//format
app.use("/api/onepic", formatRoutes);
//formatSocket
app.use("/api/onepic/multi", formatSocketRoutes);
//handleImages
app.use("/api/handleImages", handleImagesRoutes);

//ROUTE API FINISH***


// *** START STATIC SERVE

//picture compress

// eslint-disable-next-line no-undef
app.use("/assets", express.static(path.join(__dirname, ENV.FOLDER_PIC_COMPRESS)));

// STATIC SERVE FINISH ***

module.exports = app;