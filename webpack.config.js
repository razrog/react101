module.exports = {
  entry: [__dirname + "/build/index.js"],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  watchOptions: {
    aggregateTimeout: 1300
  }
}
