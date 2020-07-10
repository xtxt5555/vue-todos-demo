<script>
import TabContainer from './tab-container.vue'

export default {
  name: 'Tabs',
  components: {
    TabContainer
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  mounted () {
    // console.log(this.panes)
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  },
  render () {
    return (
      <div class="tabs">
        <ul
          class="tabs-header"
        >
          { this.$slots.default }
        </ul>
        <tab-container panes={ this.panes }/>
      </div>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tabs
  width 100%
  padding 10px 15px
.tabs-header
  height 30px
  width 100%
  list-style none
  // overflow hidden
  border-bottom 1px solid #e5e5e5
</style>
