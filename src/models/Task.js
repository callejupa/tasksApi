const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  name: {
    type: String
  },
  description: String
}, {
  timestamps: true
})

module.exports = model('Task', taskSchema)