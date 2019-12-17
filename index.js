const express = require('express')
const app = express()

const port = process.env.PORT || 5000

app.get('/', (req, res) => res.json({
    status: 200,
    message: "API Health Good"
}))

app.listen(port, () => console.log(`Application is running on ${port}!`))