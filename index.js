const express = require('express')
const db = require('./db')
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const generateId = (list) => {
  let newId
  let lastId = list[list.length - 1]
  if (!lastId) {
    newId = 0
  } else {
    newId = lastId.id
  }
  return ++newId
}

app.get('/', (req, res) => {
  res.send({ message: 'Aoba' })
})

app.get('/activities', (req, res) => {
  res.send({ activities: db.activities })
})

app.post('/activities', (req, res) => {
  console.log(req.body)
  const { name, done } = req.body
  console.log(name, done)
  const newActivity = {
    id: generateId(db.activities),
    name,
    done
  }
  db.activities.push(newActivity)
  res.send(db.activities)
})

app.delete('/activities/:id', (req, res) => {
  let newActivities = db.activities.filter((row) => row.id != req.params.id)
  db.activities = newActivities
  res.send(newActivities)
})

app.put('/activities/:id', (req, res) => {
  const { id } = req.params

  const activity = db.activities.find(activity => activity.id.toString() === id)
  const activityIndex = db.activities.findIndex(activity => activity.id.toString() === id)

  const updatedActivity = {
    ...activity,
    ...req.body
  }
  db.activities.splice(activityIndex, 1, updatedActivity)
  res.send(updatedActivity)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})