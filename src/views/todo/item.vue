<template>
  <div class="item">
    <input
      type="checkbox"
      class="toggle"
      :checked="todo.completed ? 'checked' : ''"
      @click="toggleCompleted"
    >
    <label>{{todo.message}}</label>
    <button @click="deleteTodo">x</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
    }
  },
  methods: {
    toggleCompleted() {
      this.$emit('toggle', this.todo.key)
      console.log(this.todo.key);
      
    },
    deleteTodo() {
      this.$emit('delete', this.todo.key)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables'

  .item
    text-align center
    position relative
    border-bottom 1px dashed #e5e5e5

    &:hover
      button
        display inline-block
        opacity 1

    .toggle
      position absolute
      appearance none
      left 10px
      top (($itemHeight - 20) / 2)
      outline none

      &:after
        content ''
        display inline-block
        font-size 12px
        line-height 20px
        width 20px
        height 20px
        text-align center
        border-radius 50%
        border 1px solid #e5e5e5
        cursor pointer
        font-weight 700

      &:checked:after
        content '√'
        color #3CB371

      &:checked+label
        text-decoration line-through
        color: #e5e5e5
        transition color ease 0.3s


    label
      color #3f3f3f
      line-height 35px
      text-align left
      font-size $fontSize
      width 100%
      text-indent $textIndent
      height 40px
      display inline-block
      user-select:none;

    button
      position absolute
      border none
      right 30px
      top 7px
      font-size 20px
      color #CC143C
      cursor pointer
      background-color #fff
      outline none
      opacity 0
      transition opacity ease 0.3s

</style>