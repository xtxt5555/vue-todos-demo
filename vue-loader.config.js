module.exports = isDev => {
  return {
    preserveWhitespace: false,
    extractCSS: !isDev,
    // hotReload: false, // 自动配置
    
  }
}