<script>
export default {
  name: 'Tab',
  props: {
    index: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  computed: {
    active () {
      return this.$parent.value === this.index
    }
  },
  mounted () {
    this.$parent.panes.push(this)
  },
  methods: {
    handleClick () {
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const classNames = {
      tab: true,
      active: this.active
    }
    const tab = this.$slots.label || <span>{ this.label }</span>
    return (
      <li
        class={ classNames }
        on-click={ this.handleClick }
      >
        { tab }
      </li>
    )
  }

}
</script>

<style lang="stylus" scoped>
.tab
  font-size 14px
  float left
  line-height 30px
  height 30px
  border-bottom 3px solid transparent
  padding-right 10px
  cursor pointer

  span
    display inline-block
    height 30px

  &.active
    span
      border-bottom 2px solid blue
</style>
