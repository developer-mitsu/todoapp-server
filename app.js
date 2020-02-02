const express = require('express')
const app = express()

// 環境変数を読み込む
require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001

const url = process.env.MONGODB_URL
mongoose.connect(url, { useNewUrlParser: true })

const todoSchema = new mongoose.Schema({
    content: String
})

todoSchema.set('toJSON', {
    transform: (document, data) => {
        data.id = data._id.toString()
        delete data._id
        delete data.__v
    }
})



const Todo = mongoose.model('Todo', todoSchema)

// CORSを許可
app.use(cors())
// リクエスト内のJSONデータを取得し、Javascriptオブジェクトに変換。
// その後、reqオブジェクトのbodyプロパティとして登録する
app.use(bodyParser.json())

// GET /todos　→　全てのtodosを取得
app.get('/todos', (req, res) => {
    Todo.find({})
        .then(todos => {
            res.json(todos.map(todo => todo.modifyData()))
        })
})

// POST /todos →　新しいtodoを作成
app.post('/todos', (req, res) => {
    const todo = new Todo({
        content: req.body.content
    })

    todo.save()
        .then(todo => {
            res.json(todo.modifyData())
        })
})

// DELETE /todos/1 →　特定のtodoを削除
app.delete('/todos/:id', (req, res) => {
    // const id = Number(req.params.id)
    // todos = todos.filter(todo => todo.id !== id)
    // res.status(200).end()

    const id = req.params.id
    Todo.findByIdAndRemove(id)
        .then(res => {
            res.status(200).end()
        })
})

app.listen(PORT, () => {
    console.log('Server started!')
})


