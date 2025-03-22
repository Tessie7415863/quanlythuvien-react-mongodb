const express = require("express");
const router = express.Router();

let suggestions = []; // Temporary in-memory storage for suggestions

// Handle GET requests to fetch suggestions
router.get("/", (req, res) => {
    try {
        res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle POST requests to add a new suggestion
router.post("/", (req, res) => {
    try {
        const { bookName, description } = req.body;
        if (!bookName || !description) {
            return res.status(400).send("Book name and description are required");
        }
        const newSuggestion = { bookName, description };
        suggestions.push(newSuggestion);
        res.status(201).json(newSuggestion);
    } catch (error) {
        console.error("Error saving suggestion:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
