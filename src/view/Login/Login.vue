<template>
  <!-- 主容器 -->
  <section class="container">
    <section class="bg"></section>
    <section class="content">
      <!-- 标题 -->
      <section class="title">
        <img :src="adminLogo" key="login-admin-logo">
        <span>{{title}}</span>
      </section>
      <!-- 描述 -->
      <section class="description">
        Vue Admin Pro，始终在追求极简
      </section>
      <!-- 登录 form 标题 -->
      <section class="login-way">账号密码登录</section>
      <!-- 登录 form -->
      <section class="login-form">
        <Form :model="loginInfo" @keydown.enter.native="handleSubmit">
          <Input type="text" v-model="loginInfo.account" class="login-form-input" size="large" prefix="ios-person" placeholder="请输入账号" />
          <Input type="password" v-model="loginInfo.password" on-enter="handleSubmit" class="login-form-input" size="large" prefix="md-lock" placeholder="请输入密码" />
          <Button class="login-form-btn-submit" @click="handleSubmit" on-enter="handleSubmit" type="primary">登 录</Button>
        </Form>
      </section>
    </section>
    <!-- 版本 -->
    <footer class="footer">
      Copyright &copy;2019
      <a target="_blank" href="https://fengwenyi.com">fengwenyi.com</a>
      <a target="_blank" href="https://github.com/iview/iview-admin">iView-admin</a>
    </footer>
  </section>
</template>

<script>
import adminLogo from '@/assets/images/logo.png'
import config from '@/config'
export default {
  name: 'Login',
  data () {
    return {
      adminLogo: adminLogo,
      title: config.title,
      loginInfo: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      if (!this.loginInfo.account) {
        this.$Message.error('账号不能为空')
        return
      }
      if (!this.loginInfo.password) {
        this.$Message.error('密码不能为空')
        return
      }
      this.$store.dispatch('login', this.loginInfo).then(() => {
        this.$router.push({ path: '/' })
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  }
}
</script>

<style lang="less">
@import 'Login';
</style>
