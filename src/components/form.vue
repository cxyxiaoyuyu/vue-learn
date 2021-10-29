<template>
 <div>
  <slot></slot>
 </div>
</template>

<script>
export default {
  componentName: 'KForm',
  provide(){
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
    }
  },
  created(){
    this.children = []
    this.$on('addFormItem',child => {
      this.children.push(child)
    })
  },
  methods: {
    validate(cb){
      // 获取所有的孩子formItem 执行所有子组件的validate()
      // [resultPromise]
      // const tasks = this.$children
      // .filter(item => item.prop)     // 过滤没有prop属性的form-item

      const tasks = this.children.map(item => item.validate()) 

      Promise.all(tasks).then(()=>{
        cb(true)
      }).catch(()=>{
        cb(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>