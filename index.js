const app = require('./public/express_app.js')
const port = 3000

app.listen(port, () => {
    console.log('Node Server is running on port...' + port)
}) 
