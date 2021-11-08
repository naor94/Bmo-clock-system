const mongoose = require('mongoose')

const connetionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connetionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})