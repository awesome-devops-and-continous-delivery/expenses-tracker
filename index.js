const express = require('express')
const parser = require('body-parser')

const app = express()
  .use(parser.json())
  .use(express.static('web'))

const lists = []
const expenses = []

app.get('/lists', function (req, res) {
  res.json(lists)
})

app.get('/lists/:id', function (req, res) {
  console.log(req.params.id)
  res.json(lists[req.params.id])
})

app.post('/lists', function (req, res) {
  const list = req.body
  list.id = lists.length
  lists.push(list)
  res.setHeader('Location', '/lists/' + list.id)
  res.json(list)
})

app.post('/lists/:list_id/expenses', function(req, res) {
  const expense = req.body
  expense.id = expenses.length
  expenses.push(expense)
  res.setHeader('Location', '/lists/:list_id/expenses/' + expense.id)
  res.json(expense)
})

app.listen(process.env.npm_package_config_port, function () {
  const { address, family, port } = this.address()
  console.log('-- server started on http://[%s]:%s (%s)', address, port, family)
})
