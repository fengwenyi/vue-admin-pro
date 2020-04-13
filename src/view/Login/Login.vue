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
        <span>{{subtitle}}</span>
      </section>
      <!-- 登录 form 标题 -->
      <section class="box-login">

        <!-- 登录 form -->
        <section class="login-form">
          <Form ref="formLogin" :model="formLogin" :rules="ruleFormLogin" @keydown.enter.native="handleSubmit('formLogin')">
            <FormItem prop="username">
              <Input type="text" v-model="formLogin.username" class="login-form-input" size="large"
                     prefix="ios-person" placeholder="请输入账号"/>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formLogin.password"
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
      </section>

      <div class="footer">
        &copy;2020 <a class="company" href="https://www.fengwenyi.com">fengwenyi.com</a>
      </div>
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
      subtitle: config.subtitle,
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
