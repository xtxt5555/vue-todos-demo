import Notification from './notification.vue'
import notify from './function'
// 整个notification组件由

export default Vue => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
