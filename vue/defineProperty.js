// 数组响应式
// 1 替换数组原型中的7个方法
const originalProto = Array.prototype;
const arrayProto = Object.create(originalProto);
// 覆盖
['push','pop','shift','unshift'].forEach(method => {

  arrayProto[method] = function(){
    // 原始操作
    originalProto[method].apply(this,arguments)

    // 通知更新
    console.log('执行',method,'操作')
  }
})

// 对象响应式
function defineReactive(obj,key,val){
  // 递归
  observe(val)

  Object.defineProperty(obj,key,{
    get(){
      console.log('get: '+key+' '+val)
      return val
    },
    set(newVal){
      if(newVal !== val){
        console.log('set: '+key+' '+newVal)
        val = newVal
        observe(newVal)  // 赋值的新值有可能是对象
      }
    }
  })
}

function observe(obj){
  // 希望传入的是对象
  if(typeof obj !== 'object' || obj === null){
    return
  }

  if(Array.isArray(obj)){
    // 覆盖实例原型 替换7个变更操作
    obj.__proto__ = arrayProto
    // 对数组内部的元素执行响应化
    const keys = Object.keys(obj)
    for(let i=0;i<obj.length;i++){
      observe(obj[i])
    }
  }else{
    Object.keys(obj).forEach(key=>{
      defineReactive(obj,key,obj[key])
    })
  }
}

const obj = {foo: 'foo',bar:{a:0},arr:[1,2,3]}
observe(obj)

// 让新赋值的属性也能响应化
function set(obj,key,val){
  defineReactive(obj,key,val)
}

// obj.bar.a = 10
// obj.bar.a = 20

// console.log(obj.bar.a)

// obj.bar = {b:100}
// obj.bar.b = 10000
// console.log(obj.bar.b)

// obj.dong = 'dong'
// console.log(obj.dong)

// set(obj,'dong','dongdonggong')
// obj.dong = 'newdong'

// Object.defineProperty()对数组无效
obj.arr.push(4)