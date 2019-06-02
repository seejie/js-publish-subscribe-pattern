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

const componentA = {
  name: 'A',
  methods: {
    listen: function (_this) {
      console.log('listen event ')
      eventHub.on('data', val => {
        _this.update(val)
      })
    }
  },
  created: function () {
    this.methods.listen(this)
    setTimeout(_=>{
      console.log('A destroyed')
      this.destroyed()
    }, 0)
  },
  update: function (data) {
    console.log('updated ' + this.name + ' => ' + data)
  },
  destroyed: function () {
    console.log('remove event')
    eventHub.off('data')
  }
}

componentA.created()

const componentB = {
  trigger: val => {
    eventHub.emit('data',val )
  }
}

console.log('trigger 1th')
componentB.trigger(5)
setTimeout(_=>{
  console.log('trigger 2nd')
  componentB.trigger(5)
}, 1000)
