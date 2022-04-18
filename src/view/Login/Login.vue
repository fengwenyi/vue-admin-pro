<template>
  <!-- 主容器 -->
  <section class="container">
    <section class="content">
      <section class="box-logo">
        <img class="image-logo" :src="adminLogo" key="login-admin-logo">
      </section>
      <!-- 标题 -->
      <section class="title">

        <span>{{ title }}</span>
      </section>
      <!-- 描述 -->
      <section class="description" v-if="false">
        <span>{{ subtitle }}</span>
      </section>

      <!-- 登录方式名称 -->
      <section class="box-login-way-name">
        <div class="login-way-name">{{ loginWayName }}</div>
      </section>

      <!-- 登录 form -->
      <section class="box-login">

        <!-- 登录 form -->
        <section v-if="loginWayPwd" class="login-form">
          <Form ref="formLogin" :model="formLogin" :rules="ruleFormLogin"
                @keydown.enter.native="handleSubmit('formLogin')">
            <FormItem prop="username">
              <Input type="text" v-model="formLogin.username" class="login-form-input" size="large"
                     prefix="ios-person" placeholder="账号"/>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formLogin.password"
                     class="login-form-input"
                     size="large" prefix="md-lock" placeholder="密码"/>
            </FormItem>
            <FormItem>
              <Button class="login-form-btn-submit" @click="handleSubmit('formLogin')" on-enter="handleSubmit"
                      type="primary">登 录
              </Button>
            </FormItem>
          </Form>
        </section>

        <!-- 邮箱验证码登录 form -->
        <section v-if="loginWayCodeEmail" class="login-form">
          <Form ref="formLogin2" :model="formLogin" :rules="ruleFormLogin"
                @keydown.enter.native="handleSubmit('formLogin')">
            <FormItem prop="username">
              <Input type="text" v-model="formLogin.username" class="login-form-input" size="large"
                     prefix="md-mail" placeholder="邮箱"/>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="14">
                  <Input
                    type="text"
                    v-model="formLogin.password"
                    class="login-form-input"
                    size="large"
                    prefix="md-lock"
                    placeholder="验证码"/>
                </Col>
                <Col span="8" offset="1">
                  <Button size="large" class="btn-get-code">获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button class="login-form-btn-submit" @click="handleSubmit('formLogin')" on-enter="handleSubmit"
                      type="primary">登 录
              </Button>
            </FormItem>
          </Form>
        </section>

        <!-- 手机验证码登录 form -->
        <section v-if="loginWayCodePhone" class="login-form">
          <Form ref="formLogin2" :model="formLogin" :rules="ruleFormLogin"
                @keydown.enter.native="handleSubmit('formLogin')">
            <FormItem prop="username">
              <Input type="text" v-model="formLogin.username" class="login-form-input" size="large"
                     prefix="md-phone-portrait" placeholder="手机号"/>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="14">
                  <Input
                    type="text"
                    v-model="formLogin.password"
                    class="login-form-input"
                    size="large"
                    prefix="md-lock"
                    placeholder="验证码"/>
                </Col>
                <Col span="8" offset="1">
                  <Button size="large" class="btn-get-code">获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button class="login-form-btn-submit" @click="handleSubmit('formLogin')" on-enter="handleSubmit"
                      type="primary">登 录
              </Button>
            </FormItem>
          </Form>
        </section>

        <section class="box-other-login">
          其他登录方式
          <Button class="btn-login" shape="circle" icon="md-lock" @click="changeLoginWay(1)"></Button>
          <Button class="btn-login" shape="circle" icon="md-mail" @click="changeLoginWay(2)"></Button>
          <Button class="btn-login" shape="circle" icon="md-phone-portrait" @click="changeLoginWay(3)"></Button>
        </section>
      </section>

      <div class="footer">
        Copyright &copy; 2022 <a class="company" href="https://www.fengwenyi.com?vue-admin-pro">Erwin Feng</a>
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
      },
      loginWayPwd: true,
      loginWayCodeEmail: false,
      loginWayCodePhone: false,
      loginWayName: '账号密码登录'
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
    },
    // 切换登录方式
    changeLoginWay (i) {
      if (i === 1) {
        this.loginWayName = '账号密码登录'
        this.loginWayPwd = true
        this.loginWayCodeEmail = false
        this.loginWayCodePhone = false
      } else if (i === 2) {
        this.loginWayName = '邮箱登录'
        this.loginWayPwd = false
        this.loginWayCodeEmail = true
        this.loginWayCodePhone = false
      } else if (i === 3) {
        this.loginWayName = '手机号登录'
        this.loginWayPwd = false
        this.loginWayCodeEmail = false
        this.loginWayCodePhone = true
      }
    }
  }
}
</script>

<style lang="less">
@import 'Login';
</style>
