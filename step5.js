const eventHub = {
  // 事件列表
  eventList: {},
  // 订阅
  on: function (evName, fn) {
    if (!this.eventList[evName]) {
      this.eventList[evName] = [fn]
    } else {
      this.eventList[evName].push(fn)
    }
  },
  // 发布
  emit: function (evName, args) {
    if(!this.eventList[evName]) return
    for (let i = 0, fn; fn = this.eventList[evName][i++];) {
      fn.call(this, args)
    }
  },
  // 取消订阅
  off: function (evName, fn) {
    const fns = this.eventList[evName]
    if (!fns) return
    for (let i = 0, len = fns.length; i < len; i++) {
      if (fn === fns[i]) {
        fns.splice(i, 1)
        break
      }
    } 
  },
  // 通知（全量）
  notify: function (args) {
    let obj = this.eventList
    for (let attr in obj) {
      for (let i = 0, fn; fn = obj[attr][i++];) {
        fn(args)
      }
    }
  }
}

eventHub.on('hi', (name) => console.log(name + ' :hi'))
eventHub.on('hi1', (name) => console.log(name + ' :hi1'))
eventHub.on('hi2', (name) => console.log(name + ' :hi2'))
eventHub.notify('hey')

// 思考：
// 代码洁癖者，还可以进行哪些代码简化