const mongoose = require('mongoose')

const url = ''

mongoose.connect(url, { newNewUrlParser: true})

// ここから保存

const todoSchema = new mongoose.Schema({
    content: String
})

const Todo = mongoose.model('Todo', todoSchema)

const todo = new Todo({
    content: 'Hello, mongoDB!'
})

todo.save().then(res => {
    console.log('保存完了')
    mongoose.connection.close()
})

