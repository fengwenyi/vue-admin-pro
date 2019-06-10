import {
  login,
  logout
} from '@/api/login'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    account: '',
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAccount (state, account) {
      state.account = account
    },
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    login ({ commit }, loginInfo) {
      const account = loginInfo.account.trim()
      return new Promise((resolve, reject) => {
        login(
          account,
          loginInfo.password
        ).then(res => {
          if (res.status === 200) {
            const httpData = res.data
            console.log(JSON.stringify(httpData))
            const code = httpData.code
            if (code === 0) {
              const data = httpData.data
              const token = data.token
              // this.Cookies.set('Token', token)
              commit('setToken', token)
              resolve()
            } else {
              const msg = httpData.msg
              reject(msg)
            }
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    logout2 ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
