module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
    },
  },

  lintOnSave: (process.env.NODE_ENV !== 'production') ? 'error' : false,

  devServer: {
    // disableHostCheck: true,
    proxy: 'http://localhost:8081',
    // client: {
    //   webSocketURL: 'ws://0.0.0.0:8080/ws',
    // },
  },
};
