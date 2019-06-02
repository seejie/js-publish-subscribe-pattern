const eventHub = {
  eventList: {},
  on: function (evName, fn) {
    this.eventList[evName] ? this.eventList[evName].push(fn) : this.eventList[evName] = [fn]
  },
  emit: function (evName, args) {
    for (let i = 0, fns = this.eventList[evName], fn; fn = fns ? fns[i++] : 0;) {
      fn(args)
    }
  },
  off: function (evName, cb) {
    for (let i = 0, fns = this.eventList[evName], fn; fn = fns ? fns[i++] : 0;) {
      if (cb === fn) {
        fns.splice(i - 1, 1)
        break
      }
    }
  },
  notify: function (args) {
    for (let i = 0, fn; fn = Object.values(this.eventList).flat(Infinity)[i++];){
      fn(args)
    }
  }
}

const log = console.log
log.bind(console)

eventHub.on('hi', name => log(name))
eventHub.emit('hi', 'seejie')
eventHub.on('hi', name => log(name))
eventHub.emit('hi', 'world')
eventHub.off('hi')
log(eventHub.eventList)
eventHub.emit('hi', 'world')
eventHub.notify('hi')

// 