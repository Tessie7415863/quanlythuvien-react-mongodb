const express = require("express");
const bodyParser = require("body-parser");
const suggestionsRouter = require("./suggestions");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(suggestionsRouter); // Mount the suggestions API

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("CORS is enabled for all routes.");
});
