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
  data () {
    return {
      num: 5
    }
  },
  methods: {
    listen: function () {
      console.log('listen event ')
      eventHub.on('data', val => {
        this.update(val)
      })
    }
  },
  created: function () {
    this.listen(this)
    setTimeout(_=>{
      console.log('A destroyed')
      this.destroyed()
    }, 0)
  },
  update: function (data) {
    console.log('updated ' + this.name + ' => ' + this.num * data)
  },
  destroyed: function () {
    console.log('remove event')
    eventHub.off('data')
  }
}

function proxy () {
  const dataArr = Object.keys(componentA.data())
  const methodsArr = Object.keys(componentA.methods)
  for(let i = 0, len = dataArr.length; i < len; i++) {
    componentA[dataArr[i]] = componentA.data()[dataArr[i]]
  }
  for(let i = 0, len = methodsArr.length; i < len; i++) {
    componentA[methodsArr[i]] = componentA.methods[methodsArr[i]]
  }
}

proxy()
componentA.created()

const componentB = {
  trigger: val => {
    eventHub.emit('data',val )
  }
}

console.log('trigger 1th')
componentB.trigger(3)
setTimeout(_=>{
  console.log('trigger 2nd')
  componentB.trigger(5)
}, 1000)



// const sharedPropertyDefinition = {
//   enumerable: true,
//   configurable: true,
//   get: noop,
//   set: noop
// }

// export function proxy (target: Object, sourceKey: string, key: string) {
//   sharedPropertyDefinition.get = function proxyGetter () {
//     return this[sourceKey][key]
//   }
//   sharedPropertyDefinition.set = function proxySetter (val) {
//     this[sourceKey][key] = val
//   }
//   Object.defineProperty(target, key, sharedPropertyDefinition)
// }