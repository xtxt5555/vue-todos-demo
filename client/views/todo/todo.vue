<template>
  <div class="wrapper">
    <section class="real-app">
      <tabs
        :value="state"
        @change="handleTabChange"
      >
        <tab
          v-for="item in states"
          :key="item"
          :label="item"
          :index="item"
        />
        <!-- <tab index="2">
          <template #label>
            <span :style="{color: 'red'}">tab2</span>
          </template>
          <p>content2</p>
        </tab>
        <tab
          label="tab3"
          index="3"
        >
          <p>content3</p>
        </tab> -->
      </tabs>

      <input
        v-model="message"
        type="text"
        class="add-input"
        placeholder="接下去要做些什么?"
        @keydown.enter="addTodo"
      >
      <Item
        v-for="todo in filteredTodo"
        :key="todo.key"
        :todo="todo"
        @toggle="toggleCompleted"
        @delete="deleteTodo"
      />
      <Helper
        :state="state"
        :left-num="leftNum"
        @change-state="changeState"
        @delete-completed="deleteCompleted"
      />
    </section>
  </div>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'
let id = 0 // todo的key

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  components: {
    Item,
    Helper
  },
  data () {
    return {
      todoList: [],
      message: '',
      state: 'all',
      left: 0,
      tabValue: '1',
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    filteredTodo () {
      let filteredList
      switch (this.state) {
        case 'all':
          filteredList = this.todoList
          break
        case 'active':
          filteredList = this.todoList.filter(todo => todo.completed === false)
          break
        case 'completed':
          filteredList = this.todoList.filter(todo => todo.completed === true)
      }
      return filteredList
    },
    leftNum () {
      return this.todoList.filter(todo => todo.completed === false).length
    }
  },
  methods: {
    addTodo () {
      this.todoList.unshift({
        key: id++,
        completed: false,
        message: this.message.trim()
      })
      this.message = ''
    },
    toggleCompleted (key) {
      const toggleOne = this.todoList.filter(todo => todo.key === key)[0]
      this.$set(toggleOne, 'completed', !toggleOne.completed)
    },
    deleteTodo (key) {
      const deleteIdx = this.todoList.findIndex(todo => todo.key === key)
      this.todoList.splice(deleteIdx, 1)
    },
    changeState (state) {
      this.state = state
    },
    deleteCompleted () {
      this.todoList = this.todoList.filter(todo => todo.completed === false)
    },
    handleTabChange (val) {
      this.state = val
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables'
  .wrapper
    min-height 350px

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
