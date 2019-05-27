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
  }
}

const log = console.log
log.bind(console)

eventHub.on('hi', (name) => log(name))
eventHub.emit('hi', 'seejie')
eventHub.on('hi', (name) => log(name))
eventHub.emit('hi', 'world')
eventHub.off('hi')
log(eventHub.eventList)
eventHub.emit('hi', 'world')