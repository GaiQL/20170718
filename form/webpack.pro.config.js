const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');  //无法被浏览器识别，但是loaders编译过后可以变成浏览器可识别的。在Node环境中可以直接运行
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩

//-----完成react的按需加载和verdor
const config = {
  mode:'production',//'production',
  entry: './entry.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath:'./',
    // 添加 chunkFilename
    chunkFilename: '[name]-[id].js',
    /*
      name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。

      .[chunkhash:5]. 是文件的 hash 码，这里只使用前五位。
    */
  },
  devtool: 'inline-source-map',   //生产环境下使用
  module: {
   rules: [
     // {
     //    test: /\.bundle\.js$/,
     //    loader: 'bundle-loader',
     //    options: {
     //      lazy: true ,
     //      name: '[name]'
     //    }
     // },
     {
        test:/\.(png|jpg|gif)$/,
        loaders:[
        //小于8k的图片编译为base64，大于10k的图片使用file-loader
        'url-loader?limit=8192&name:img/[name]-[hash:5].[ext]',
        //图片压缩
        'image-webpack-loader'
        ]
      },
     {
        test:/\.css$/,
        use: ['style-loader', 'css-loader']
     },
     {
        test: /\.(js|jsx)$/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: []
          }
        }
     },
     {
        test: /\.(vue)$/,
        use: ['vue-loader']
     },
     {
       test: /\.mp4$/,
       use: ['file-loader']
     }
   ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，哈哈哈哈哈哈哈哈哈哈哈哈哈'),
    new UglifyJSPlugin({
       sourceMap: true,
       uglifyOptions: {
       compress: {
         drop_console: true
       }
     }
    }),//压缩
    new HtmlWebpackPlugin({
      template:'./template.html'
    }),//创建html页面  https://www.cnblogs.com/wonyun/p/6030090.html 详解配置设置模板，输出位置，多个HTML页面
    // new webpack.optimize.CommonsChunkPlugin({
    //    name: 'common' // 指定公共 bundle 的名称。
    // })
    // CommonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
  ]
}

module.exports = config;
