const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [{
    test: /\.(c|le)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: "postcss-loader",
        options: {
          plugins: [
            require("autoprefixer")
          ]
        }
      },
      'less-loader'
    ]
  },
  {
    test: /\.js$/, //js文件加载器
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  },
  {
    test: /\.html$/,
    use: [{
      loader: 'html-loader',
      options: {
        interpolate: true,
        minimize: false
      }
    }]
  }, {
    test: /\.ejs/,
    use: ['ejs-loader'],
  }
]
