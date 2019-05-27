const eventHub = {
  eventList: {},
  on: function (evName, fn) {
    if (!this.eventList[evName]) {
      this.eventList[evName] = [fn]
    } else {
      this.eventList[evName].push(fn)
    }
  },
  emit: function (evName, args) {
    for (let attr in this.eventList) {
      if (attr === evName) {
        for (let i = 0, fn; fn = this.eventList[attr][i++];) {
          fn.call(this, args)
        }
      }
    }
  },
  off: function (evName) {
    for (let attr in this.eventList) {
      if (attr === evName) {
        delete this.eventList[evName]
        break
      }
    }
  }
}

eventHub.on('hi', (name) => console.log(name))
eventHub.emit('hi', 'seejie')
eventHub.on('hi', (name) => console.log(name))
eventHub.emit('hi', 'world')
eventHub.off('hi')
eventHub.emit('hi', 'hey')
