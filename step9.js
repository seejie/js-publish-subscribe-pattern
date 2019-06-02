const eventHub = {
  // 事件匹配关系
  eventList: {},
  // 订阅
  on: function (evName, fn) {},
  // 发布
  emit: function (evName, args) {},
  // 取消订阅
  off: function (evName) {},
  // 通知所有事件
  notify: function (evName) {},
  // 清空所有事件
  clear: function (){},
  // 取消某一事件的所有订阅者
  cancel: function (){},
  // 只调用一次
  once: function (){}  
}