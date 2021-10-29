<template>
 <div class="inputWrapper">
  <label v-if="label">{{label}}</label>
  <slot></slot>

  <!-- 校验信息 -->
  <span class="error" v-if="error">{{error}}</span>
 </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '@/mixins/mixin'
export default {
  componentName: 'KFormItem',
  inject: ['form'],
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data(){
    return {
      error: ''  // error为空说明校验通过
    }
  },
  mounted(){
    this.$on('validate',()=>{
      this.validate()
    })

    // 通知kform 新增一个form-item 实例
    if(this.prop){
      this.dispatch('KForm','addFormItem',[this])
    }
  },
  methods: {
    validate(){
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]

      // 校验描述对象
      const desc = {[this.prop]: rules}
      // 创建Schema实例
      const schema = new Schema(desc)
      return schema.validate({[this.prop]:value},errors => {
        if(errors){
          this.error = errors[0].message
        }else{  // 校验通过
          this.error = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.inputWrapper{
  display: flex;
  height: 50px;
}
label {
  width: 4em;
  text-align: left;
}
.error {
  color: red;
  padding-left: 20px;
  font-size: 14px;
}
</style>