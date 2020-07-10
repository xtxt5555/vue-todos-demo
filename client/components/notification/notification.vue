<template>
  <transition
    name="fade"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      v-show="visible"
      class="notification"
      :style="style"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{ content }}</span>
      <a
        class="btn"
        @click="handleClose"
      >{{ btn }}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    clearTimer () {},
    creteTimer () {}
  }
}
</script>

<style lang="stylus" scoped>
  .notification
    display flex
    flex-wrap wrap
    align-items center
    position fixed
    right 20px
    bottom 70px
    min-width 280px
    font-size 14px
    color #255
    background-color #303030
    padding 20px
    box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
    transition all .3s
    user-select none
  .content
    padding 0
  .btn
    color #ff4081
    padding-left 24px
    margin-left auto
    cursor pointer
</style>
