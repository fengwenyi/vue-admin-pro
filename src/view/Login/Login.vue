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
            <section class="login-way-region">
                <Tabs value="login-way">
                    <TabPane label="账号密码登录" name="login-way-1">
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
                                    <Button class="login-form-btn-submit" @click="handleSubmit" on-enter="handleSubmit"
                                            type="primary">登 录
                                    </Button>
                                </FormItem>
                            </Form>
                        </section>
                    </TabPane>
                    <TabPane label="扫码登录" name="login-way-2">扫码登录</TabPane>
                    <TabPane label="验证码登录" name="login-way-3">验证码登录</TabPane>
                </Tabs>
            </section>

        </section>
        <!-- 版本 -->
        <footer class="footer">
            <div>
                &copy;2019
                <a target="_blank" href="https://www.fengwenyi.com">fengwenyi.com</a>
                <a target="_blank" href="https://github.com/iview/iview-admin">iView-admin</a>
                <a target="_blank" href="https://www.iviewui.com/">View UI</a>
            </div>
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
    handleSubmit () {
      this.$store.dispatch('login', this.formLogin).then(() => {
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style lang="less">
    @import 'Login';
</style>
