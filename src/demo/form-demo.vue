<template>
  <div id="app">
    <k-form :model="userInfo" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="userInfo.username" placeholder="请输入用户名"></k-input>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input type="password" v-model="userInfo.password" placeholder="请输入密码"></k-input>
      </k-form-item>
      <k-form-item>
        <button @click="login">登录</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KInput from "@/components/input";
import KFormItem from "@/components/form-item";
import KForm from "@/components/form";
import Notice from '@/components/notice.vue'

export default {
  name: "app",
  data() {
    return {
      userInfo: {
        username: "tom",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  components: {
    KInput,
    KFormItem,
    KForm,
  },
  methods: {
    login(){
      this.$refs.loginForm.validate(valid=>{
          const notice = this.$notice({
            title: 'Notice title',
            message: valid ? '登录成功':'校验失败',
            duration: 2000
          })
          notice.show()
      }) 
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
