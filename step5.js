const eventHub = {
  eventList: {},
  on: function (evName, fn) {
    this.eventList[evName] ? this.eventList[evName].push(fn) : this.eventList[evName] = [fn]
  },
  emit: function (evName, args) {
    for (let i = 0, attr = this.eventList[evName], fn; fn = attr ? attr[i++] : 0;) {
      fn(args)
    }
  },
  off: function (evName) {
    this.eventList[evName] = []
  },
  notify: function (args) {
    let x = this.eventList
    for (let attr in x) {
      for (let i = 0, fn; fn = x[attr][i++];) {
        fn(args)
      }
    }
  },
  clear: function () {
    this.eventList = {}
  }
}

const log = console.log
log.bind(console)

eventHub.on('hi', (name) => log(name))
eventHub.emit('hi', 'seejie')
eventHub.on('hi', (name) => log(name))
eventHub.on('hi2', (name) => log(name))
eventHub.notify('hey')
eventHub.emit('hi', 'world')
eventHub.off('hi')
eventHub.emit('hi', 'wow')

eventHub.on('hi', (name) => log(name))
eventHub.on('hi', (name) => log(name))
eventHub.on('hi2', (name) => log(name))
eventHub.clear()
eventHub.notify('hey')