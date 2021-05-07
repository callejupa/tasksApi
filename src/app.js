const Hapi = require('@hapi/hapi')
require('./database')

const Task = require('./models/Task')

const init = async () => {
  const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
  })
  server.route({
    method: 'POST',
    path: '/tasks',
    handler: async (req, h) => {
      try {
        const task = new Task(req.payload)
        const taskSaved = await task.save()
        return h.response(taskSaved)
      } catch (error) {
        return h.response(error).code(500)
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/tasks',
    handler: async (req, h) => {
      try {
        const tasks = await Task.find()
        return h.response(tasks)
      } catch (error) {
        return h.response(error).code(500)
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/tasks/{id}',
    handler: async (req, h) => {
      try {
        const task = await Task.findById(req.params.id)
        return h.response(task)
      } catch (error) {
        return h.response(error).code(500)
      }
    }
  })

  server.route({
    method: 'PUT',
    path: '/tasks/{id}',
    handler: async (req, h) => {
      try {
        const updateTask = await Task.findByIdAndUpdate(req.params.id, req.payload, {new: true})
        return h.response(updateTask)
      } catch (error) {
        return h.response(error).code(500)
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/tasks/{id}',
    handler: async (req, h) => {
      try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        return h.response(deleteTask)
      } catch (error) {
        return h.response(error).code(500)
      }
    }
  })

  await server.start()
  console.log(`server running on ${server.info.uri}`)
}

init()