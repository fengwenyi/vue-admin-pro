<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
    <Icon v-show="!collapsed" custom="iconfont icon-menuoff"></Icon>
    <Icon v-show="collapsed" custom="iconfont icon-menuon"></Icon>
  </a>
</template>
<script>
export default {
  name: 'siderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange () {
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>
<style lang="less">
@import './sider-trigger.less';
</style>
