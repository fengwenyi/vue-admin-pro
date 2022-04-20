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
              <Button class="login-form-btn-submit" @click="handleSubmit('formLogin')"
                      type="primary">登 录
              </Button>
            </FormItem>
          </Form>
        </section>

        <!-- 邮箱验证码登录 form -->
        <section v-if="loginWayCodeEmail" class="login-form">
          <Form ref="formEmailLogin" :model="formEmailLogin" :rules="ruleFormEmailLogin"
                @keydown.enter.native="handleSubmit('formEmailLogin')">
            <FormItem prop="email">
              <Input type="text" v-model="formEmailLogin.email" class="login-form-input" size="large"
                     prefix="md-mail" placeholder="邮箱"/>
            </FormItem>
            <FormItem prop="emailCode">
              <Row :gutter="16">
                <Col span="14">
                  <Input
                    type="text"
                    v-model="formEmailLogin.code"
                    class="login-form-input"
                    size="large"
                    prefix="md-lock"
                    placeholder="验证码"/>
                </Col>
                <Col span="10">
                  <Button v-if="showBtnGetEmailCode" size="large" class="btn-get-code" @click="handleGetEmailCode">获取验证码</Button>
                  <Button v-if="!showBtnGetEmailCode" size="large" class="btn-get-code" disabled="">{{ numGetEmailCodeCountdown }}</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button class="login-form-btn-submit" @click="handleSubmit('formEmailLogin')"
                      type="primary">登 录
              </Button>
            </FormItem>
          </Form>
        </section>

        <!-- 手机验证码登录 form -->
        <section v-if="loginWayCodePhone" class="login-form">
          <Form ref="formPhoneLogin" :model="formPhoneLogin" :rules="ruleFormPhoneLogin"
                @keydown.enter.native="handleSubmit('formPhoneLogin')">
            <FormItem prop="phone">
              <Input type="text" v-model="formPhoneLogin.phone" class="login-form-input" size="large"
                     prefix="md-phone-portrait" placeholder="手机号"/>
            </FormItem>
            <FormItem prop="phoneCode">
              <Row :gutter="16">
                <Col span="14">
                  <Input
                    type="text"
                    v-model="formPhoneLogin.code"
                    class="login-form-input"
                    size="large"
                    prefix="md-lock"
                    placeholder="验证码"/>
                </Col>
                <Col span="10">
                  <Button v-if="showBtnGetPhoneCode" size="large" class="btn-get-code" @click="handleGetPhoneCode">获取验证码</Button>
                  <Button v-if="!showBtnGetPhoneCode" size="large" class="btn-get-code" disabled="">{{ numGetPhoneCodeCountdown }}</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button class="login-form-btn-submit" @click="handleSubmit('formPhoneLogin')"
                      type="primary">登 录
              </Button>
            </FormItem>
          </Form>
        </section>

        <section class="box-other-login">
          其他登录方式
          <Button class="btn-login" shape="circle" icon="md-lock" @click="changeLoginWay('formLogin')"></Button>
          <Button class="btn-login" shape="circle" icon="md-mail" @click="changeLoginWay('formEmailLogin')"></Button>
          <Button class="btn-login" shape="circle" icon="md-phone-portrait" @click="changeLoginWay('formPhoneLogin')"></Button>
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
      loginWayName: '账号密码登录',
      formEmailLogin: {
        email: '',
        code: ''
      },
      ruleFormEmailLogin: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        emailCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 4,
            message: '验证码不能少于4个字符',
            trigger: 'blur'
          }
        ]
      },
      formPhoneLogin: {
        phone: '',
        code: ''
      },
      ruleFormPhoneLogin: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 4,
            message: '验证码不能少于4个字符',
            trigger: 'blur'
          }
        ]
      },
      showBtnGetEmailCode: true,
      numGetEmailCodeCountdown: 59,
      showBtnGetPhoneCode: true,
      numGetPhoneCodeCountdown: 59
    }
  },
  methods: {
    // 登录
    handleSubmit (formName) {
      this.$Message.warning(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = {}
          if (formName === 'formLogin') {
            formData = this.formEmailLogin
          } else if (formName === 'formEmailLogin') {
            formData = this.formEmailLogin
          } else if (formName === 'formPhoneLogin') {
            formData = this.formEmailLogin
          }
          this.$store.dispatch('login', formData).then(() => {
            this.$router.push({ path: '/' })
          })
        }
      })
    },
    // 切换登录方式
    changeLoginWay (formName) {
      if (formName === 'formLogin') {
        this.loginWayName = '账号密码登录'
        this.loginWayPwd = true
        this.loginWayCodeEmail = false
        this.loginWayCodePhone = false
      } else if (formName === 'formEmailLogin') {
        this.loginWayName = '邮箱登录'
        this.loginWayPwd = false
        this.loginWayCodeEmail = true
        this.loginWayCodePhone = false
      } else if (formName === 'formPhoneLogin') {
        this.loginWayName = '手机号登录'
        this.loginWayPwd = false
        this.loginWayCodeEmail = false
        this.loginWayCodePhone = true
      }
    },
    // 获取邮箱验证码
    handleGetEmailCode () {
      if (this.formEmailLogin.email === '') {
        return
      }
      // 发送验证码-api

      this.$Message.success('验证码发送成功')
      this.countdownGetCode('email', 59)
      this.showBtnGetEmailCode = false
    },
    // 获取手机验证码
    handleGetPhoneCode () {
      if (this.formPhoneLogin.phone === '') {
        return
      }
      // 发送验证码-api

      this.$Message.success('验证码发送成功')
      this.countdownGetCode('phone', 59)
      this.showBtnGetPhoneCode = false
    },
    // 获取验证码倒计时
    countdownGetCode (type, num) {
      let times = setInterval(() => {
        if (type === 'email') {
          num = this.numGetEmailCodeCountdown--
        } else if (type === 'phone') {
          num = this.numGetPhoneCodeCountdown--
        }

        if (num <= 0) {
          if (type === 'email') {
            this.showBtnGetEmailCode = true
            this.numGetEmailCodeCountdown = 59
          } else if (type === 'phone') {
            this.showBtnGetPhoneCode = true
            this.numGetEmailCodeCountdown = 59
          }
          clearInterval(times)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less">
@import 'Login';
</style>
