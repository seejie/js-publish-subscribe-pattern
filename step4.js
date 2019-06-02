// 通用发布-订阅模型

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
  }
}

const a = name => console.log(name + ':a')
const b = name => console.log(name + ':b')
eventHub.on('hi', a)
eventHub.emit('hi', 'seejie')
eventHub.on('hi', b)
eventHub.emit('hi', 'world')
eventHub.off('hi', a)
eventHub.emit('hi', 'hey')

// 思考：
// 添加全量通知