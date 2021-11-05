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

  Object.keys(obj).forEach(key=>{
    defineReactive(obj,key,obj[key])
  })
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