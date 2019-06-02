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
  }
}

const componentA = {
  name: 'A',
  methods: {
    fn: function (data) {
      componentA.update(data)
    },
    listen: function () {
      console.log('listen event ')
      eventHub.on('data', componentA.methods.fn)
    }
  },
  created: function () {
    this.methods.listen()
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
    eventHub.off('data', componentA.methods.fn)
  }
}

componentA.created()

const componentB = {
  trigger: val => {
    eventHub.emit('data', val )
  }
}

console.log('trigger 1th')
componentB.trigger(5)
setTimeout(_=>{
  console.log('trigger 2nd')
  componentB.trigger(5)
}, 1000)

// eventHub对象可以看做为vue里的eventBus对象
// 之所以vue实例可以直接调用this.$on(),this.$emit()
// 应该是因为vue使用了另一设计模式：代理模式
// 将this.eventBus.$on()代理到this.$on()