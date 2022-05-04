require('dotenv').config()

const express = require('express')
const logger = require('morgan')

const app = express()
const PORT = process.env.PORT

app.use(logger('dev'))

app.use(express.json()) //http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) //http://expressjs.com/en/5x/api.html#express.urlencoded

const recipeRouter = require('./routes/recipes')

app.use('/api/v0', recipeRouter)

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})