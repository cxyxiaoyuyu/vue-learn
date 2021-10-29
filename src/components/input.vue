<template>
 <div>
   <!-- 展开attrs -->
   <input :value="value" @input="onInput" v-bind="$attrs">
 </div>
</template>

<script>
import emitter from '@/mixins/mixin'
export default {
  inheritAttrs: false,  // 避免设置到根元素上
  props: ['value'],
  mixins: [emitter],
  methods: {
    onInput(e){
      // v-model
      this.$emit('input',e.target.value)

      // 通知父级执行校验
      // this.$parent.$emit('validate')

      // 问题1 摆脱parent 如果结构发生了变化 parent就不是form-item了
      // 解决 利用mixin dispatch 声明componentName
      this.dispatch('KFormItem','validate')
    }
  }

}
</script>

<style lang="scss" scoped>

</style>