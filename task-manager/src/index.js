const express = require('express')
const cors=require('cors')
require("./db/mongoose")

const userRouter = require('./routers/user')
const employeeRouter = require('./routers/employee')
const app = express()
const port = process.env.PORT || 3000
const multer = require('multer')
app.use(cors())
app.use((req,res,next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requsted-With, Content-Type, Accept, Authoriztion');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
next();



}
);
app.get('/products/:id',function(req,res,next){
    res.json({msg: 'this'})})

app.l
const upload = multer({
    dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(employeeRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})