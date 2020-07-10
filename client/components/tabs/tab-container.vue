<script>
export default {
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render () {
    const panes = this.panes.map(item => {
      return item.active ? item.$slots.default : null
    })
    return (
      <div class="tab-content">
        { panes }
      </div>
    )
  }
}
</script>
