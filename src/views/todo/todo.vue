<template>
  <section class="real-app">
    <input type="text" class="add-input" placeholder="接下去要做些什么?" v-model="message" @keydown.enter="addTodo">
    <Item 
      v-for="todo in filteredTodo"
      :key="todo.key"
      :todo="todo"
      @toggle="toggleCompleted"
      @delete="deleteTodo"
    />
    <Tabs
      :state="state"
      :leftNum="leftNum"
      @changeState="changeState"
      @deleteCompleted="deleteCompleted"
    />
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0 //todo的key

export default {
  components: {
    Item,
    Tabs,
  },
  data() {
    return {
      todoList: [],
      message: '',
      state: 'all',
      left: 0
    }
  },
  computed: {
    filteredTodo() {
      switch(this.state) {
        case 'all':
          return this.todoList
          break
        case 'active':
          return this.todoList.filter(todo => todo.completed === false)
          break
        case 'completed':
          return this.todoList.filter(todo => todo.completed === true)
      }
    },
    leftNum() {
      return this.todoList.filter(todo => todo.completed === false).length
    }
  },
  methods: {
    addTodo() {
      this.todoList.unshift({
        key: id++,
        completed: false,
        message: this.message.trim(),
      })
      this.message = ''
    },
    toggleCompleted(key) {
      const toggleOne = this.todoList.filter(todo => todo.key === key)[0]
      this.$set(toggleOne, 'completed', !toggleOne.completed)
    },
    deleteTodo(key) {
      const deleteIdx = this.todoList.findIndex(todo => todo.key === key)
      this.todoList.splice(deleteIdx, 1)
    },
    changeState(state) {
      this.state = state
    },
    deleteCompleted() {
      this.todoList = this.todoList.filter(todo => todo.completed === false)
    },
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables'
  
  .real-app
    margin 0 auto
    width $appWidth
    text-align center
    background-color #fff
    box-shadow 0 0 20px 1px;

  .add-input
    width 100%
    text-indent $textIndent
    font-size 16px
    line-height 35px
    height $itemHeight
    border none
    border-bottom 1px dashed #e5e5e5

    &:focus
      outline none 
</style>