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

// function proxy () {
//   const dataArr = Object.keys(componentA.data())
//   const methodsArr = Object.keys(componentA.methods)
//   for(let i = 0, len = dataArr.length; i < len; i++) {
//     componentA[dataArr[i]] = componentA.data()[dataArr[i]]
//   }
//   for(let i = 0, len = methodsArr.length; i < len; i++) {
//     componentA[methodsArr[i]] = componentA.methods[methodsArr[i]]
//   }
// }
// proxy()


const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: undefined,
  set: undefined
}

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function loop () {
  const methodsArr = Object.keys(componentA.methods)
  for(let i = 0, len = methodsArr.length; i < len; i++) {
    proxy(componentA, 'methods', methodsArr[i])
  }
}
loop()

componentA.created()

const componentB = {
  trigger: val => {
    eventHub.emit('data', val)
  }
}

console.log('trigger 1th')
componentB.trigger(3)
setTimeout(_=>{
  console.log('trigger 2nd')
  componentB.trigger(5)
}, 1000)

