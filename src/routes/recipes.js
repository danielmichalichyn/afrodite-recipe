//@ts-check
// /routes/recipes.js

const express = require('express')
const router = express.Router()
const recipesController = require ('../controllers/recipes');
const recipes = new recipesController();

router.get('/recipes',recipes.getRecipes);

module.exports = router