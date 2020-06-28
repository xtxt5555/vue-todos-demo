import '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'XT'
    }
  },
  render () {
    return (
      <div class="footer">
        <span>written by {this.author}</span>
      </div>
    )
  }
}
