const express = require('express')
const parser = require('body-parser')

const app = express()
  .use(parser.json())
  .use(express.static('web'))

const lists = []
const lists_dict = {}

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
  lists_dict[list.id] = []
  res.setHeader('Location', '/lists/' + list.id)
  res.json(list)
})

app.post('/lists/:id/expenses', function (req, res) {
  var cat_list = lists_dict[req.params.id]

  if (cat_list) {
    const expense = req.body
    expense.id = cat_list.length

    cat_list.push(expense)
    console.log('added %s expense', expense.id)

    //res.setHeader('Location', '/lists/' + list.id)
    res.status(201)
    res.json(cat_list)
  } else {
    console.log('list with id %s doesn\'t exist you goat', req.params.id)
  }
})

app.listen(process.env.npm_package_config_port, function () {
  const { address, family, port } = this.address()
  console.log('-- server started on http://[%s]:%s (%s)', address, port, family)
})
