// 此为拓展后的Notificaiton组件，具有堆叠效果
import Notification from './notification.vue'

export default {
  extends: Notification,
  data () {
    return {
      verticalOffset: 0,
      height: 0
    }
  },
  computed: {
    style () {
      return {
        postition: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.vm.$el.offsetHeight
    }
  }
}
