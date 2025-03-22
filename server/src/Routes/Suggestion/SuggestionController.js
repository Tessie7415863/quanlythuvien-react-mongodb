const express = require("express");
const suggestionRoute = express.Router();
const {
  createSuggestion,
  getAllSuggestion,
  deleteSuggestion,
  updateSuggestion,
} = require("../../Controllers/Suggestion/SuggestionController");

suggestionRoute.post("/create-suggestion", createSuggestion);
suggestionRoute.get("/get-all-suggestion", getAllSuggestion);
suggestionRoute.delete("/delete-suggestion/:id", deleteSuggestion);
suggestionRoute.put("/update-suggestion/:id", updateSuggestion);

module.exports = suggestionRoute;
