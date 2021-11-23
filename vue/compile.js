// 编译器
// 递归遍历dom树

class Compile {
  // el是宿主元素  vm是kvue实例
  constructor(el,vm){
    this.$vm = vm
    this.$el = document.querySelector(el)
    if(this.$el){
      this.compile(this.$el)  // 因为是递归的 所以这里要传参
    }
  }
  compile(el){       
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 判断节点类型
      if(this.isElement(node)){
        this.compileElement(node)
      }else if(this.isInterPosition(node)){
        this.compileText(node)
      }

      // 递归子节点
      if(node.childNodes && node.childNodes.length){
        this.compile(node)
      }
    })
  }
  // 编译元素节点
  compileElement(node){
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 指令以v-xx = '123' 定义
      const attrName = attr.name // v-xx
      const exp = attr.value  // 123

      // 指令
      if(this.isDirective(attrName)){
        const dir = attrName.substring(2) // xx
        // 执行指令
        this[dir] && this[dir](node,exp)
      }

      // 事件
      if(this.isEvent(attrName)){
        // @click = "onClick"
        const event = attrName.substring(1) // click
        this.eventHandler(node,exp,event)
      }


    })
  }
  // 编译文本节点 
  compileText(node){
    // node.textContent = this.$vm[RegExp.$1] 
    this.update(node,RegExp.$1,'text')
  }


  // 执行更新函数 将更新函数放入watchers
  update(node,exp,dir){
    // 指令对应的更新函数 xxUpdater
    const fn = this[dir+'Updater']
    fn && fn(node,this.$vm[exp])

    // 更新函数放入watcher
    new Watcher(this.$vm,exp,function(val){
      fn && fn(node,val)
    })

  }

  // v-text 指令
  text(node,exp){
    // node.textContent = this.$vm[exp]
    this.update(node,exp,'text')
  }
  // v-html
  html(node,exp){
    // node.innerHTML = this.$vm[exp]
    this.update(node,exp,'html')
  }
  // v-model
  model(node,exp){
    // update只完成赋值和更新
    this.update(node,exp,'model')

    // 事件监听
    node.addEventListener('input',e => {
      this.$vm[exp] = e.target.value
    })
  }





  textUpdater(node,value){
    node.textContent = value
  }
  htmlUpdater(node,value){
    node.innerHTML = value
  }
  modelUpdater(node,value){
    node.value = value
  }

  isDirective(attrName){
    return attrName.indexOf('v-') === 0
  }
  isEvent(attrName){
    return attrName.indexOf('@') === 0
  }
  eventHandler(node,exp,event){
    // const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp] 
    node.addEventListener(event,this.$vm[exp].bind(this.$vm))
  }
  isElement(node){
    return node.nodeType === 1
  }
  isInterPosition(node){
    // 首先是文本 其次内容是{{xxx}}
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

