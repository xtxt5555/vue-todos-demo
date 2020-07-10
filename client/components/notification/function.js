// 定义Notifiction的通知函数，返回Notification实例
import Vue from 'vue'
import Component from './func-notification'

// 创建Notification组件的构造器
const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const notify = options => {
  if (Vue.prototype.$isServer) return

  const { autoClose, ...rest } = options

  const instance = new NotificationConstructor({
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose,
      visible: false
    },
    propsData: { ...rest }
  })

  const id = `notification_${seed++}`

  const removeInstance = function (instance) {
    if (!instance) return
    const idx = instances.findIndex(item => instance.id === item.id)
    instances.splice(idx, 1)

    const reducedHeight = instance.vm.height
    for (let i = idx; i < instances.length; i++) {
      instances[i].verticalOffset -= (reducedHeight + 16)
    }
  }

  // 初始化notification高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset

  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  instances.push(instance)

  instance.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  instance.$on('close', () => {
    instance.vm.visible = false
  })

  return instance.vm
}

export default notify
