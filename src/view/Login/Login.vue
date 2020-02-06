<template>
  <!-- 主容器 -->
  <section class="container">
    <section class="bg"></section>
    <section class="content">
      <section class="box-logo">
        <img class="image-logo" :src="adminLogo" key="login-admin-logo">
      </section>
      <!-- 标题 -->
      <section class="title">

        <span>{{title}}</span>
      </section>
      <!-- 描述 -->
      <section class="description">
        始终在追求极简
      </section>
      <!-- 登录 form 标题 -->
      <section class="box-login">

        <!-- 登录 form -->
        <section class="login-form">
          <Form ref="formLogin" :model="formLogin" :rules="ruleFormLogin" @keydown.enter.native="handleSubmit">
            <FormItem prop="username">
              <Input type="text" v-model="formLogin.username" class="login-form-input" size="large"
                     prefix="ios-person" placeholder="请输入账号"/>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formLogin.password" on-enter="handleSubmit"
                     class="login-form-input"
                     size="large" prefix="md-lock" placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
              <Button class="login-form-btn-submit" @click="handleSubmit('formLogin')" on-enter="handleSubmit"
                      type="primary">登 录
              </Button>
            </FormItem>
          </Form>
        </section>
        <section class="box-third-login">
          <section class="box-item-content">
            <Tooltip content="Apple登录">
              <section class="item item-login-way-apple">
                <Icon type="logo-apple"/>
              </section>
            </Tooltip>
            <Tooltip content="Google登录">
              <section class="item item-login-way-google">
                <Icon type="logo-google"/>
              </section>
            </Tooltip>
            <Tooltip content="Github登录">
              <section class="item item-login-way-github">
                <Icon type="logo-github"/>
              </section>
            </Tooltip>
          </section>
        </section>
        <section class="box-login-way-select">
          <span class="item" v-show="false">账号密码登录 <span class="split">|</span></span>
          <span class="item">手机登录 <span class="split">|</span></span>
          <span class="item">邮箱登录 <span class="split">|</span></span>
          <span class="item">扫码登录</span>
        </section>
      </section>

    </section>
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
      formLogin: {
        username: '',
        password: ''
      },
      ruleFormLogin: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码不能少于6个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('login', this.formLogin).then(() => {
            this.$router.push({ path: '/' })
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import 'Login';
</style>
