<template>
  <div class="tabs">
    <div class="undo">
      {{ leftNum }} items left
    </div>
    <div class="states">
      <span
        :class="state === 'all' ? 'active' : ''"
        @click="change-state"
      >all</span>
      <span
        :class="state === 'active' ? 'active' : ''"
        @click="change-state"
      >active</span>
      <span
        :class="state === 'completed' ? 'active' : ''"
        @click="change-state"
      >completed</span>
    </div>
    <div
      class="clear"
      @click="delete-completed"
    >
      Clear Completed
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      required: true
    },
    leftNum: {
      type: Number,
      required: true
    }
  },
  methods: {
    changeState (eve) {
      this.$emit('change-state', eve.target.innerHTML)
    },
    deleteCompleted () {
      this.$emit('delete-completed')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables'
  .tabs
    font-size 12px
    overflow hidden
    text-align left
    line-height $tabsHeight
    padding 2px 0
    .undo,.states,.clear
      display inline-block
      height $tabsHeight
      width 32%
    .undo
      text-indent 15px
    .states
      text-align center
      line-height $tabsHeight - 10
      padding-top 5px
      span
        display inline-block
        margin-right 1px
        padding 0 5px
        border-radius 5px
        cursor pointer

        &.active
          border 1px solid #CC143C

    .clear
      text-align right
      cursor pointer
</style>
