const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
require('dotenv').config()
const app = express()

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {  console.log("connected!");});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))



app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
res.render('articles/index', { articles: articles})
})

app.use('/articles', articleRouter)
// app.listen(3000)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});

// "devStart": "nodemon server.js"