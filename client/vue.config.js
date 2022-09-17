module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
    },
  },
  lintOnSave: (process.env.NODE_ENV !== 'production') ? 'error' : false,
};
