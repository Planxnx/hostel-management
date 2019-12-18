const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const routes = require('./routes/route');

const port = process.env.PORT || 5000

app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return next()
})
app.use('/api/v1', routes);

app.listen(port, () => console.log(`Application is running on ${port}!`))