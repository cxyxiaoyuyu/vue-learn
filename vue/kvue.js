function defineReactive(obj, key, val) {
  // 递归
  observe(val)

  // 创建一个Dep 和当前的key 一一对应
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      console.log('get: ' + key + ' ' + val, Dep.target)
      
      // 依赖收集
      if(Array.isArray(val)){
        Dep.target && val.__ob__.dep.addDep(Dep.target)
      }else{
        Dep.target && dep.addDep(Dep.target)
      }
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set: ' + key + ' ' + newVal)
        val = newVal
        observe(newVal)  // 赋值的新值有可能是对象

        // 更新函数
        // watchers.forEach(w => {
        //   w.update()
        // })
        dep.notify()
      }
    }
  })
}

function observe(obj) {
  // 希望传入的是对象
  if (typeof obj !== 'object' || obj === null) {
    return
  }

  // 创建Observer实例  
  new Observer(obj)
}

// 代理函数 用户直接访问$data中的数据
function proxy(vm) {
  // 代理数据
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      }
    })
  })

  // 代理方法
  Object.keys(vm.$methods).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$methods[key]
      },
      set(newVal) {
        vm.$methods[key] = newVal
      }
    })
  })
}

class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this)

    // 编译器
    new Compile(this.$options.el, this)
  }
}
KVue.set = set
KVue.prototype.$set = set

function set(target,key,val){
  if(Array.isArray(target)){
    target.splice(key, 1, val);
  }



  const ob = target.__ob__
  ob.dep.notify() // 通知更新
}

// Observer 执行数据响应化 分辨数据是对象还是数组
class Observer {
  constructor(value) {
    this.value = value

    // 将value 挂上__ob__ 属性
    this.dep = new Dep()
    console.log(value,'this')
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,  // 不可遍历  
      writable: true,
      configurable: true
    })

    if (typeof value === 'object') {
      if(Array.isArray(value)){
        this.walkArray(value)
      }else{
        this.walk(value)
      }
    }
  }
  // 对象数据响应化
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }

  // 数组对象响应化？？？
  // 1 找到数组原型
  // 2 覆盖那些能够修改数组的更新方法 使其可以通知更新
  // 3 将得到的新的原型设置到数据实例原型上
  walkArray(value) {
    const originalProto = Array.prototype;
    const arrayProto = Object.create(originalProto);
    // 覆盖
    ['push', 'pop', 'shift', 'unshift'].forEach(method => {
      arrayProto[method] = function () {
        // 原始操作
        originalProto[method].apply(this, arguments)

        // 通知更新 ??? 怎麼通知的
        console.log('执行', method, '操作')

        const ob = value.__ob__
        console.log(ob,'obbbb')
        ob.dep.notify()
      }
    })

    value.__proto__ = arrayProto
    for(let i=0;i<value.length;i++){
      observe(value[i])
    }

  }
}

// 观察者 保存更新函数 值发生变化 调用更新函数
// const watchers = []
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // watchers.push(this)

    // Dep.target静态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key]   // get里收集
    Dep.target = null
  }
  update() {
    // this.vm[this.key] 就是最新的值
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

// Dep 管理某个key相关的所有Watcher实例
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}