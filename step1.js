// js原生通信

function A () {
  this.say = function (msg) {
    console.log(msg + ': A')
  }
  this.call = function (msg) {
    B().say(msg)
  }
  return {
    say,
    call
  }
}

function B () {
  this.say = function (msg) {
    console.log(msg + ': B')
  }
  this.call = function (msg) {
    A().say(msg)
  }
  return {
    say,
    call
  }
}

A().say('am')
A().call('hi')

B().say('am')
B().call('hi')

// 缺点：
// 1. 高耦合，A里有B，B里有A，能调用是因为存在函数变量提升，不能使用函数表达式
// 2. 不符合开闭原则，如果A需要调用新的模块C，要重新修改A的内部代码
// 3. 异步操作，A要知道所有依赖其本身的模块，并主动调用推进下游模块执行
// 4. 不利于重构、移植、扩展等


// 方案：
// 1. 下游模块轮训检测依赖模块的数据变化
// 2. 订阅-发布模式（需要订阅，部分发布）
// 3. 观察者模式（不需要订阅，全量通知）
// 4. 维护一个新的全局的公共存储区，如：状态管理
