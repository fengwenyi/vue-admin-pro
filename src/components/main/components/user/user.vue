<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <!--<Avatar :src="userAvatar"/>-->
        <Avatar :src="imgHeader"/>
        <span class="user-name">Yasuo</span>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import imgHeader from '@/assets/images/yasuo.jpg'

export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      imgHeader: imgHeader
    }
  },
  methods: {
    ...mapActions([
      'logout2'
    ]),
    logout () {
      this.logout2().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
