// 发布-订阅通用实现模型

// 事件中心，vue中叫eventBus事件总线
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
  }
}

const a = name => console.log(name)
eventHub.on('hi', a)
eventHub.emit('hi', 'seejie')
eventHub.on('hi', (name) => console.log(name))
eventHub.emit('hi', 'world')

// 思考：
// 添加取消订阅