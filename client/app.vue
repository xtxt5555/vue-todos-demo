<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <!-- <router-link to="/app">
      app
    </router-link>
    <router-link to="/login">
      login
    </router-link> -->
    <!-- <Todo /> -->
    <transition name="fade">
      <router-view />
    </transition>
    <!-- <Notification content="test notify" /> -->
    <button @click="btnClick">
      点我
    </button>
    <Footer />
  </div>
</template>

<script>
import Header from './layout/header.vue'
// import Todo from './views/todo/todo.vue'
import Footer from './layout/footer.jsx'

export default {
  metaInfo: {
    title: "XT's Todo App"
  },
  components: {
    Header,
    // Todo,
    Footer
  },
  mounted () {

  },
  methods: {
    btnClick () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

#cover
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.7;
  z-index: -1;
</style>
