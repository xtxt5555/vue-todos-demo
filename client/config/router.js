import VueRouter from 'vue-router'
import routes from './routes'

export default () => {
  return new VueRouter({
    routes,
    mode: 'history',
    // base: '/public/', // 和publicPath类似
    // linkActiveClass: //部分符合路由在router-link上添加class
    // linkExactActiveClass: //完全符合路由在router-link上添加class
    scrollBehavior (to, from, savedPostion) {
      if (savedPostion) {
        return savedPostion
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
    // fallback: true
    // parseQuery (str) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
