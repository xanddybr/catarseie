const app = require('./public/app_handlebars.js')
const port = 3000

app.listen(port, () => {
    console.log('Node Server is running on port...' + port)
}) 