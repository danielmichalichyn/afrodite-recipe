require('dotenv').config()

const express = require('express')
const logger = require('morgan')

const app = express()
const PORT = process.env.PORT

app.use(logger('dev'))

app.use(express.json()) //http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) //http://expressjs.com/en/5x/api.html#express.urlencoded

const recipeRouterV0 = require('./v0/routes/recipes');
const recipeRouterV1 = require('./v1/routes/recipes');

app.use('/api/v0', recipeRouterV0);
app.use('/api/v1', recipeRouterV1);

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})