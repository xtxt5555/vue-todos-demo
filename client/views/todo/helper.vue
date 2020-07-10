<template>
  <div class="tabs">
    <div class="undo">
      {{ leftNum }} items left
    </div>
    <div
      class="clear"
      @click="deleteCompleted"
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
      width 49%
    .undo
      text-indent 15px

    .clear
      text-align right
      cursor pointer
</style>
